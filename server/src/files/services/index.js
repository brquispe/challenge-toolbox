const config = require("../../config");
const FetchApi = require("../../libs/fetch");
const CSVParser = require("../../libs/csv");
const NotFoundFetchError = require("../../libs/fetch/errors/not-found");
const { NotFoundError } = require("../../errors");
const Validator = require("../../libs/validator");

const options = {
  headers: {
    Authorization: `Bearer ${config.API_KEY}`,
  },
};
class FilesService {
  constructor(apiUrl = config.FILES_API_URL) {
    this.apiUrl = apiUrl;
  }

  /**
   * @returns {Promise<{ files: string[] }>}
   */
  getFileNames() {
    return FetchApi.get(`${this.apiUrl}/secret/files`, options);
  }

  /**
   * @param {string} filename
   * @returns {Promise<string>}
   */
  async getFile(filename) {
    try {
      const file = await FetchApi.get(
        `${this.apiUrl}/secret/file/${filename}`,
        options,
        false
      );
      return file;
    } catch (err) {
      if (err instanceof NotFoundFetchError) {
        throw new NotFoundError(`File '${filename}' not found`);
      }
      throw err;
    }
  }

  /**
   * @param {{file: string, text: string, number: string, hex: string}[][]} file
   * @returns {{ file: string, lines: {text: string, number: number, hex: string}[] }[]}
   */
  groupCSVFilesByFile(file) {
    return file
      .filter((line) => line.length > 0)
      .map((lines) => {
        const filename = lines[0].file.trim();
        return {
          file: filename,
          lines: lines.map(({ file, ...rest }) => ({
            ...rest,
            number: Number(rest.number),
          })),
        };
      });
  }

  /**
   * @param {string[]} data
   */
  formatFile(data) {
    const parsedData = data.map((file) => CSVParser.parse(file));
    const okValues = parsedData.map((fileLines) => {
      const newValidLines = fileLines.filter((fileLine) =>
        Validator.isObjectParseable(fileLine, {
          file: { type: "string" },
          hex: { type: "hex", length: 32 },
          number: { type: "number" },
          text: { type: "string" },
        })
      );

      return newValidLines;
    });

    return this.groupCSVFilesByFile(okValues);
  }

  /**
   * @param {string} [fileName]
   * @returns {Promise<{file: string; lines: { text: string; number: number; hex: string }[]}[]>}
   */
  async getData(fileName) {
    const fileNames = fileName ? { files: [fileName] } : await this.getFileNames();
    /** @type {string[]} */
    const filesData = [];
    for (const filename of fileNames.files) {
      try {
        const fileContent = await this.getFile(filename);
        filesData.push(fileContent);
      } catch (err) {
        console.error(err);
      }
    }
    const groupedFiles = this.formatFile(filesData);
    return groupedFiles;
  }
}

module.exports = FilesService;

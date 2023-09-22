const config = require("../../config");
const FetchApi = require("../../libs/fetch");
const CSVParser = require("../../libs/csv");
const NotFoundFetchError = require("../../libs/fetch/errors/not-found");
const { NotFoundError } = require("../../errors");

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
  getFiles() {
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
   * @returns {{ file: string, lines: {text: string, number: string, hex: string}[] }[]}
   */
  formatFile(file) {
    return file
      .filter((line) => line.length > 0)
      .map((lines) => {
        const filename = lines[0].file.trim();
        return {
          file: filename,
          lines: lines.map(({ file, ...rest }) => rest),
        };
      });
  }

  /**
   * @param {string} [fileName]
   */
  async getData(fileName) {
    const fileNames = fileName ? { files: [fileName] } : await this.getFiles();
    const filesData = [];
    for (const filename of fileNames.files) {
      try {
        const fileContent = await this.getFile(filename);
        filesData.push(fileContent);
      } catch (err) {
        console.error(err);
      }
    }
    const data = await Promise.all(filesData);
    /** @type {{file: string, text: string, number: string, hex: string}[][]}  */
    const parsedData = data.map((file) => CSVParser.parse(file));
    const formattedFiles = this.formatFile(parsedData);

    return formattedFiles;
  }
}

module.exports = FilesService;

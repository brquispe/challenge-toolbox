const config = require("../../config");
const FetchApi = require("../../libs/fetch");
const CSVParser = require("../../libs/csv");

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
  async getFiles() {
    const data = await FetchApi.get(`${this.apiUrl}/secret/files`, options);
    return data;
  }

  /**
   * @param {string} filename
   * @returns {Promise<string>}
   */
  getFile(filename) {
    try {
      const file = FetchApi.get(
        `${this.apiUrl}/secret/file/${filename}`,
        options,
        false
      );
      return file;
    } catch (err) {
      throw new Error("Could not read file");
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

  async getData() {
    const fileNames = await this.getFiles();
    const filesData = fileNames.files.map(async (filename) =>
      this.getFile(filename)
    );
    const data = await Promise.all(filesData);
    /** @type {{file: string, text: string, number: string, hex: string}[][]}  */
    const parsedData = data.map((file) => CSVParser.parse(file));
    const formattedFiles = this.formatFile(parsedData);

    return formattedFiles;
  }
}

module.exports = FilesService;

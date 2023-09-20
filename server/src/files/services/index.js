const config = require("../../config");
const FetchApi = require("../../libs/fetch");

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
}

module.exports = FilesService;

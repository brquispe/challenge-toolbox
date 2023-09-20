const https = require("https");

/**
 * HTTPS Node.js module wrapper for fetching data easily
 */
class FetchApi {
  /**
   * @param {string} url
   * @param {import('https').RequestOptions} [options]
   * @returns {Promise<unknown>}
   */
  static get(url, options) {
    return new Promise((resolve, reject) => {
      https
        .get(url, options, (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };
};

module.exports = FetchApi;

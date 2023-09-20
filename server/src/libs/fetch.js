const https = require("https");

/**
 * HTTPS Node.js module wrapper for fetching data easily
 */
class FetchApi {
  /**
   * @template T
   * @param {string} url
   * @param {import('https').RequestOptions} [options]
   * @returns {Promise<T>}
   */
  static get(url, options, parseJSON = true) {
    return new Promise((resolve, reject) => {
      https
        .get(url, options, (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            if (parseJSON) {
              const jsonData = JSON.parse(data);
              return resolve(jsonData);
            }
            resolve(data);
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };
};

module.exports = FetchApi;

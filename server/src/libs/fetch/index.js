const https = require('https')
const NotFoundFetchError = require('./errors/not-found')
const FetchError = require('./errors/error')

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
  static get (url, options, parseJSON = true) {
    return new Promise((resolve, reject) => {
      https
        .get(url, options, (response) => {
          let data = ''

          response.on('data', (chunk) => {
            data += chunk
          })

          response.on('end', () => {
            if (parseJSON) {
              data = JSON.parse(data)
            }
            if (response.statusCode !== 200) {
              // handle throwing Errors
              if (response.statusCode === 404) {
                reject(new NotFoundFetchError(data))
              }
              reject(new FetchError(url, data))
            }
            resolve(data)
          })
        })
        .on('error', (err) => {
          reject(err)
        })
        .end()
    })
  }
}

module.exports = FetchApi

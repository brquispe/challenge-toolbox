class FetchError extends Error {
  constructor(message = 'Could not fetch', statusCode = 400) {
    super(message, statusCode);
  }
}

module.exports = FetchError;

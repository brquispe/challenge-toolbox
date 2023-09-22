const FetchError = require('./error');

class NotFoundFetchError extends FetchError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

module.exports = NotFoundFetchError;

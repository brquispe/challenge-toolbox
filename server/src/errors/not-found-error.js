class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
  }
}

module.exports = NotFoundError;

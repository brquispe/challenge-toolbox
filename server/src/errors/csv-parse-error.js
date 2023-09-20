class CSVParseError extends Error {
  constructor(message) {
    this.message = 'Could not parse the CSV string: ', message;
  }
}

module.exports = CSVParseError;

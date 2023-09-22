class CSVParseError extends Error {
  constructor(message = "Could not parse the CSV string: ") {
    super(message);
  }
}

module.exports = CSVParseError;

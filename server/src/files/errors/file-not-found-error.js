class FileNotFoundError extends Error {
  constructor() {
    super("File not found!");
  }
}

module.exports = FileNotFoundError;

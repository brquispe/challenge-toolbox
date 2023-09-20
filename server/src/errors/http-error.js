export class HttpError extends Error {
  constructor(status = 500, message) {
    this.status = status;
    this.message = message;
  } 
}

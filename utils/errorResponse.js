// blue print for the error response
class ErrorResponse extends Error {
  constructor(message, status){
    super(message);
    this.statusCode = statusCode
  }
}

module.exports = ErrorResponse
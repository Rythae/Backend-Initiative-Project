/**
 * export
 */
class HttpException {
  /**
   * @param {String} type - type of http error
   * @param {Object} error - error object
   * @param {String} message - the error message
   */
  constructor(type, error) {
    this.error = error;
    let message;

    switch (type) {
      case "MissingToken":
        message = "no token found";
        this.statusCode = 401;
        break;
      case "InvalidToken":
        message = "invalid token";
        this.statusCode = 401;
        break;
      case "Unauthorised":
        message = "Unauthorised user";
        this.statusCode = 403;
        break;
      case "UnprocessableEntity":
        message = "wrong input provided";
        this.statusCode = 422;
        break;
      default:
        message = "unknown error";
        this.statusCode = 500;
    }

    this.errorResponse = {
      message,
      error,
    };
  }
}

module.exports =  HttpException;

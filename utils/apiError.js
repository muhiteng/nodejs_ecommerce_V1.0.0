class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.mess = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperitional = true;
  }
}

module.exports = ApiError;

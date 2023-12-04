class appError {
    statusCode;
    message;

    constructor(statusCode = 400, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = appError;
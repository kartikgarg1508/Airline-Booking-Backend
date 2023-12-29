const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.cityname) {
    ErrorResponse.message = "Something went wrong while creating the city";
    ErrorResponse.error = new AppError(
      ["City name not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};

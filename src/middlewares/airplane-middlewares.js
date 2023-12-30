const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something went wrong while creating the airplane";
    ErrorResponse.error = new AppError(
      ["Model number not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body.capacity) {
    ErrorResponse.message = "Something went wrong while updating the airplane";
    ErrorResponse.error = new AppError(
      ["Capacity not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};

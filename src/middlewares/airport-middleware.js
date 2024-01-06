const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateCreateRequest(req, res, next) {
  console.log(req.body);
  if (req.body.name && req.body.code && req.body.cityId) {
    next();
  } else {
    ErrorResponse.message = "Something went wrong while creating the airport";
    let explanation = [];

    if (!req.body.name)
      explanation.push("Name of Airport not found in the incoming request");

    if (!req.body.code)
      explanation.push("Code of Airport not found in the incoming request");

    if (!req.body.cityId)
      explanation.push("CityId of Airport not found in the incoming request");

    ErrorResponse.error = new AppError(explanation, StatusCodes.BAD_REQUEST);
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
}

function validateUpdateRequest(req, res, next) {
  if (req.body.name && req.body.code) {
    next();
  } else {
    ErrorResponse.message = "Something went wrong while updating the airport";
    let explanation = [];

    if (!req.body.name)
      explanation.push("Name of Airport not found in the incoming request");

    if (!req.body.code)
      explanation.push("Code of Airport not found in the incoming request");

    ErrorResponse.error = new AppError(explanation, StatusCodes.BAD_REQUEST);
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};

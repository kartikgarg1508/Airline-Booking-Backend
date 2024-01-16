const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");
const { DateTimeCompare } = require("../utils/helper");

function validateCreateRequest(req, res, next) {
  if (
    req.body.airlines &&
    req.body.flightNumber &&
    req.body.airplaneId &&
    req.body.arrivalAirportCode &&
    req.body.departureAirportCode &&
    req.body.arrivalTime &&
    req.body.departureTime &&
    req.body.price &&
    DateTimeCompare(req.body.departureTime, req.body.arrivalTime)
  ) {
    next();
  } else {
    ErrorResponse.message = "Something went wrong while creating the flight";
    let explanation = [];
    if (!req.body.airlines)
      explanation.push("Name of Airlines not found in the incoming request");

    if (!req.body.flightNumber)
      explanation.push("flightnumber not found in the incoming request");

    if (!req.body.airplaneId)
      explanation.push("airplaneId not found in the incoming request");

    if (!req.body.arrivalAirportCode)
      explanation.push("arrivalAirportId not found in the incoming request");

    if (!req.body.departureAirportCode)
      explanation.push("departureAirportId not found in the incoming request");

    if (!req.body.arrivalTime)
      explanation.push("arrivalTime not found in the incoming request");

    if (!req.body.departureTime)
      explanation.push("departureTime not found in the incoming request");

    if (!req.body.price)
      explanation.push("price not found in the incoming request");

    if (req.body.arrivalTime && req.body.departureTime) {
      if (!DateTimeCompare(req.body.departureTime, req.body.arrivalTime))
        explanation.push("Arrival Time cannot be less than Departure Time");
    }

    ErrorResponse.error = new AppError(explanation, StatusCodes.BAD_REQUEST);
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
}

function validateSeatUpdateRequest(req, res, next) {
  if (req.body.noOfSeats) {
    next();
  } else {
    ErrorResponse.message =
      "Something went wrong while updating the available seats of the flight";
    let explanation = [];

    if (!req.body.noOfSeats)
      explanation.push(
        "Number of Seats (noOfSeats) not found in the incoming request"
      );

    ErrorResponse.error = new AppError(explanation, StatusCodes.BAD_REQUEST);
    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  validateCreateRequest,
  validateSeatUpdateRequest,
};

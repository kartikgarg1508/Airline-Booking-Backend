const { FlightService, AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
req-body {
  airlines: Indigo
  flightnumber: 6E2009,
  airplaneId: 5,
  arrivalAirportCode: DEL,
  departureAirportCode: BOM,
  arrivalTime: 2024-01-06 12:00:00
  departureTime: 2024-01-06 09:30:00,
  price: 4000,
  boardingGate: 1A
}
*/

async function createFlight(req, res) {
  try {
    const availableSeats = await AirplaneService.getCapacity(
      req.body.airplaneId
    );

    const flight = await FlightService.createFlight({
      airlines: req.body.airlines,
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      arrivalAirportCode: req.body.arrivalAirportCode,
      departureAirportCode: req.body.departureAirportCode,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalAvailableSeats: availableSeats,
    });
    SuccessResponse.data = flight;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const airports = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};

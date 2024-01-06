const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

const flightrepository = new FlightRepository();

async function createFlight(data) {
  try {
    console.log(data);
    const flight = await flightrepository.create(data);
    return flight;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((element) => {
        explanation.push(element.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    if (error.name == "SequelizeForeignKeyConstraintError") {
      throw new AppError(
        "There is no city with given AirportCode",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      "Cannot create a new airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlights() {
  try {
    const airports = await flightrepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getFlights,
};

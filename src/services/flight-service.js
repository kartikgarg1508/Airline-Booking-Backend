const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const flightrepository = new FlightRepository();

async function createFlight(data) {
  try {
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

function createFilter(params) {
  let filter = {};

  if (params.trips) {
    // trips : DEL-BLR
    const [departureAirportCode, arrivalAirportCode] = params.trips.split("-");

    if (departureAirportCode === arrivalAirportCode)
      throw new AppError(
        "Departure Airport and Arrival Airport should not be same",
        StatusCodes.BAD_REQUEST
      );

    filter.departureAirportCode = departureAirportCode;
    filter.arrivalAirportCode = arrivalAirportCode;
  }

  if (params.travellers) {
    // travellers: 2
    filter.totalAvailableSeats = {
      [Op.gte]: params.travellers,
    };
  }

  if (params.price) {
    // price: 5000-8000
    [minPrice, maxPrice] = params.price.split("-");
    if (maxPrice) {
      filter.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else {
      filter.price = {
        [Op.gte]: minPrice,
      };
    }
  }

  let endingTime = " 23:59:59";

  if (params.tripDate) {
    filter.departureTime = {
      [Op.between]: [params.tripDate, params.tripDate + endingTime],
    };
  }

  return filter;
}

function createSortOrder(params) {
  let sortOrder = [];

  if (params.sort) {
    // sort : price_ASC,departureTime_ASC
    let sortingOptions = params.sort.split(",");
    sortingOptions.map((option) => {
      sortOrder.push(option.split("_"));
    });
  }

  return sortOrder;
}

async function getAllFlights(queryParams) {
  try {
    let customFilter = createFilter(queryParams);
    let customSort = createSortOrder(queryParams);

    const airports = await flightrepository.getAllFlights(
      customFilter,
      customSort
    );
    return airports;
  } catch (error) {
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw error;
    }
    throw new AppError(
      "Cannot fetch the data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const airport = await flightrepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("No Flight with given id found", error.statusCode);
    }
    throw new AppError(
      "Cannot fetch the data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAvailableSeats(data) {
  try {
    const flight = await flightrepository.updateAvailableSeats(
      data.flightId,
      data.noOfSeats,
      data.decrease
    );
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "There is no flight with given flightId",
        error.statusCode
      );
    }
    if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw new AppError(
        "The flight does not have enough available seats",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot update Available Seats of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateAvailableSeats,
};

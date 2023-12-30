const { CityRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

const cityrepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityrepository.create(data);
    return city;
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
    throw new AppError(
      "Cannot create a new city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const cities = await cityrepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all the cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const response = await cityrepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError(
        "The requested City to be deleted does not exist",
        error.statusCode
      );

    throw new AppError(
      "Cannot delete the requested City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityrepository.update(id, data);
    return response;
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
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested city id to be modified does not exist",
        error.statusCode
      );
    }

    throw new AppError(
      "Cannot update the name of the requested city id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  getCities,
  deleteCity,
  updateCity,
};

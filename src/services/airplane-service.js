const { AirlineRepository } = require("../repositories");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

const airlinerepository = new AirlineRepository();

async function createAirplane(data) {
  try {
    const airplane = await airlinerepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((element) => {
        explanation.push(element.message);
      });
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airlinerepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch the data of all the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airlinerepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError("No Airplane with given id found", error.statusCode);

    throw new AppError(
      "Cannot fetch the data of all the requested airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirplane(id) {
  try {
    const response = await airlinerepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError(
        "The requested airplane to be deleted does not exist",
        error.statusCode
      );

    throw new AppError(
      "Cannot delete the requested airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  deleteAirplane,
};

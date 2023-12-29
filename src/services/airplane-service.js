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

module.exports = {
  createAirplane,
};

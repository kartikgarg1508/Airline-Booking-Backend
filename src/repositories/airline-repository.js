const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models");
const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

class AirlineRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }

  async getCapacity(airplaneid) {
    const response = await Airplane.findAll({
      where: {
        id: airplaneid,
      },
      attributes: ["Capacity"],
    });
    if (!response[0]) {
      throw new AppError(
        "The resource you requested was not found",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}

module.exports = AirlineRepository;

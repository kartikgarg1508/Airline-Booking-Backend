const CrudRepository = require("./crud-repository");
const { City } = require("../models");

const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        name: data,
      },
    });
    if (!response) {
      throw new AppError(
        "The resource you requested to delete was not found",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}

module.exports = CityRepository;

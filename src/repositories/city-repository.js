const CrudRepository = require("./crud-repository");
const { City } = require("../models");

const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }
}

module.exports = CityRepository;

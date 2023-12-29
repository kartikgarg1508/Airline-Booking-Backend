const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models");

class AirlineRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirlineRepository;

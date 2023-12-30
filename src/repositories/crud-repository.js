const { AppError } = require("../utils/errors");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
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

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(
        "The resource you requested was not found",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll(data) {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    // data : { col1 : value, ...}

    // to check whether the given id exists or not and to handle validation errors seperately
    // because otherwise update just returns [0] wether id not found or data validaton fails

    const response = await this.get(id);
    const updatedAirplane = await this.model.update(data, {
      where: {
        id: id,
      },
    });

    return updatedAirplane;
  }
}

module.exports = CrudRepository;

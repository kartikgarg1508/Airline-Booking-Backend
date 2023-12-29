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

  async Update(id, data) {
    // data : { col1 : value, ...}
    const response = await this.model.Update(data, {
      where: {
        id: id,
      },
    });
  }
}

module.exports = CrudRepository;

const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const modelnumber = req.body.modelNumber;
    const capacity = req.body.capacity;

    const airplane = await AirplaneService.createAirplane({
      ModelNumber: modelnumber,
      Capacity: capacity,
    });

    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};

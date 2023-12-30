const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse, SuccessResponse } = require("../utils/common");

/*
req-body {cityname: string}
*/

async function createCity(req, res) {
  try {
    const cityname = req.body.cityname;

    const city = await CityService.createCity({
      name: cityname,
    });

    SuccessResponse.data = city;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteCity(req, res) {
  try {
    const response = await CityService.deleteCity(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const data = {
      name: req.body.cityname,
    };
    const city = await CityService.updateCity(req.params.id, data);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  getCities,
  deleteCity,
  updateCity,
};

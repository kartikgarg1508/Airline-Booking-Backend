const express = require("express");
const router = express.Router();

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

/*
POST : /api/v1/cities
req-body {cityname: string}
*/

router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

/*
GET : /api/v1/cities
*/

router.get("/", CityController.getCities);

/*
DELETE : /api/v1/cities/:name
*/

router.delete("/:name", CityController.deleteCity);

module.exports = router;

const express = require("express");
const router = express.Router();

const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

/*
POST : /api/v1/flights
req-body {modelNumber: alphanumeric, capacity : integer<=1000}
*/

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

/*
GET : /api/v1/airplanes
*/

router.get("/", FlightController.getFlights);

module.exports = router;

const express = require("express");
const router = express.Router();

const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

/*
POST : /api/v1/flights
req-body {
  airlines: Indigo
  flightnumber: 6E2009,
  airplaneId: 5,
  arrivalAirportCode: DEL,
  departureAirportCode: BOM,
  arrivalTime: 2024-01-06 12:00:00
  departureTime: 2024-01-06 09:30:00,
  price: 4000,
  boardingGate: 1A (optional)
}
*/

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

/*
GET : /api/v1/flights
query params optional: {
  trips: (departure-arrival) DEL-BLR,
  price: (minPrice-maxPrice) 5000-10000 or minPrice(5000) or nothing
  traveller: 2
  tripDate: 2024-01-10
  sort: price_ASC,departureTime_ASC etc.
}
*/

router.get("/", FlightController.getAllFlights);

/*
GET : /api/v1/flights/:id
req-body: {}
*/

router.get("/:id", FlightController.getFlight);

/*
PATCH : /api/v1/flights/:id/seats
req-body {
  flightId: 1
  noOfSeats: 5
  decrease: 0 (pass this if you want to increment the seats)
}
*/

router.patch(
  "/:id/seats",
  FlightMiddleware.validateSeatUpdateRequest,
  FlightController.updateAvailableSeats
);

module.exports = router;

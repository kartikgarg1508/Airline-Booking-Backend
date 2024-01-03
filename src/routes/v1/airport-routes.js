const express = require("express");
const router = express.Router();

const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");

/*
POST : /api/v1/airports
req-body {name: string, code: string, address: string, cityId: integer}
*/

router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);

/*
GET : /api/v1/airports
*/

router.get("/", AirportController.getAirports);

/*
GET : /api/v1/airports/:id
*/

router.get("/:id", AirportController.getAirport);

/*
DELETE : /api/v1/airports/:id
*/

router.delete("/:id", AirportController.deleteAirport);

/*
PATCH : /api/v1/airports/:id
req-body {name: string, code:string}
*/

router.patch(
  "/:id",
  AirportMiddleware.validateUpdateRequest,
  AirportController.updateAirport
);

module.exports = router;

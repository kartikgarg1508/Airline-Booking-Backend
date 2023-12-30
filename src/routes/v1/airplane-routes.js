const express = require("express");
const router = express.Router();

const { AirplaneController } = require("../../controllers");
const { AirplanMiddlewares } = require("../../middlewares");

/*
POST : /api/v1/airplane
req-body {modelNumber: alphanumeric, capacity : integer<=1000}
*/

router.post(
  "/",
  AirplanMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

/*
GET : /api/v1/airplane
*/

router.get("/", AirplaneController.getAirplanes);

/*
GET : /api/v1/airplane/:id
*/

router.get("/:id", AirplaneController.getAirplane);

/*
DELETE : /api/v1/airplane/:id
*/

router.delete("/:id", AirplaneController.deleteAirplane);

/*
PATCH : /api/v1/airplane/:id
req-body {capacity : integer<=1000}
*/

router.patch(
  "/:id",
  AirplanMiddlewares.validateUpdateRequest,
  AirplaneController.updateAirplane
);

module.exports = router;

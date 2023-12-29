const express = require("express");
const router = express.Router();

const { AirplaneController } = require("../../controllers");
const { AirplanMiddlewares } = require("../../middlewares");

router.post(
  "/",
  AirplanMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

module.exports = router;

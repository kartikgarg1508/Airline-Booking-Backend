const express = require("express");
const router = express.Router();

const { infoController } = require("../../controllers");
const AirplaneRoutes = require("./airplane-routes");
const CityRoutes = require("./city-routes");

router.use("/airplane", AirplaneRoutes);
router.use("/cities", CityRoutes);

router.get("/info", infoController.info);

module.exports = router;

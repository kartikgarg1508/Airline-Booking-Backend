const express = require("express");
const router = express.Router();

const { infoController } = require("../../controllers");
const AirplaneRoutes = require("./airplane-routes");

router.use("/airplane", AirplaneRoutes);

router.get("/info", infoController.info);

module.exports = router;

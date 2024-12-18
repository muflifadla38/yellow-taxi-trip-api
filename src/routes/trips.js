const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trips");

router.get("/", (req, res) => {
  res.send("API is working!");
});

router.get("/trips", tripController.getTrips);
router.get("/demand-trend", tripController.getDemandTrend);
router.get("/income-trend", tripController.getIncomeTrend);

module.exports = router;

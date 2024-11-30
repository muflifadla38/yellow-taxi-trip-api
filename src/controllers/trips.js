require("dotenv").config();

const axios = require("axios");
const datasetUrl =
  process.env.DATASET_URL ||
  "https://data.cityofnewyork.us/resource/gkne-dk5s.json";

const tripsController = {
  async getTrips(req, res, next) {
    try {
      const params = new URLSearchParams();
      const {
        pickupDatetime,
        dropoffDatetime,
        minFareAmount,
        maxFareAmount,
        minDistance,
        maxDistance,
        paymentType,
        limit,
      } = req.query;

      let query = [];

      if (minFareAmount) query.push(`fare_amount=${minFareAmount}`);
      if (maxFareAmount) query.push(`fare_amount=${maxFareAmount}`);
      if (minDistance) query.push(`trip_distance=${minDistance}`);
      if (maxDistance) query.push(`trip_distance=${maxDistance}`);
      if (pickupDatetime) query.push(`pickup_datetime='${pickupDatetime}'`);
      if (dropoffDatetime) query.push(`dropoff_datetime='${dropoffDatetime}'`);
      if (paymentType) query.push(`payment_type='${paymentType}'`);

      if (query.length) params.append("$where", `${query.join(" AND ")}`);
      params.append("$limit", limit);

      console.log(`${datasetUrl}?${params.toString()}`);

      const response = await axios.get(`${datasetUrl}?${params.toString()}`);

      if (!response.data.length)
        throw {
          status: 400,
          name: "NoDataError",
          message: "Trip Not Found!",
        };

      res.status(200).json({
        message: "Successfully retrieved trips data",
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getDemandTrend(req, res, next) {
    try {
      const query =
        "$select=date_trunc_ym(pickup_datetime) as month, count(*) as trip_count&$group=month&$order=month ASC";

      const response = await axios.get(`${datasetUrl}?${query}`);
      const demandTrends = response.data.map((trend) =>
        Number(trend.trip_count)
      );

      res.status(200).json({
        message: "Successfully retrieved demand trend data",
        data: demandTrends,
      });
    } catch (error) {
      next(error);
    }
  },

  async getIncomeTrend(req, res, next) {
    try {
      const query =
        "$select=date_extract_m(pickup_datetime) as month_num, sum(total_amount) as total_income&$group=month_num&$order=month_num ASC";

      const response = await axios.get(`${datasetUrl}?${query}`);
      const incomeTrends = response.data.map((trend) =>
        Number(trend.total_income).toFixed(0)
      );

      res.status(200).json({
        message: "Successfully retrieved income trend data",
        data: incomeTrends,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = tripsController;

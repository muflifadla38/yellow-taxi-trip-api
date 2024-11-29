const express = require("express");
const bodyParser = require("body-parser");
const tripRoutes = require("./src/routes/trips");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use("/api/v1/", tripRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.response?.data.message || error.message;

  res.status(status).json({ message: message, data: error.data });
  next();
});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});

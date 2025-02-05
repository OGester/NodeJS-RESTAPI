const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handling middleware to prevent duplicate code
app.use((error, req, res, next) => {
  // checks if a response has already been sent
  if (res.headerSent) {
    return next(error);
  }
  // either the set errorcode for the object or the default code of 500
  // for something went wrong on the server if undefined
  res.status(error.code || 500);
  // check if there is a error message on the object else given a generic error message
  res.json({ message: error.message || "An unknown error occured! " });
});

app.listen(3000);

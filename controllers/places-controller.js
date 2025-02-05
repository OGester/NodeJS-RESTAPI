const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "A really big sky scraper",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th st, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // {pid: 'p1'}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    // provides simpler and more dynamic error handling using the http-error model
    // next() needs to be returned to cancel folowing functions
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );
    /*   const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    // could use throw error in syncronous BUT if in a async function next() should be used!
    // next() needs to be returned to cancel folowing functions
    return next(error); */
  }
  res.json({ place }); // => {place} => {place: place}
};
//alternative approaches
// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided user id", 404);
    /*  const error = new Error("Could not find a place for the provided user id.");
    error.code = 404;
    // could use throw error in syncronous BUT if in a async function next() should be used!
    // throw automatically cancels following functions
    throw error; */
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  // shortcut from doing this => const title = req.body.title... on every input
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace) will add as first object, push as last

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updeatedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
};

const deletePlace = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

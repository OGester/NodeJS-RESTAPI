const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id", 404)
    );
  }

  res.json({ places });
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

  // using the spread value and curly braces we make a copy using the old keyvalue object
  // this makes sure the object isnt updated until everything is done and working
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  // creates a new copy of DUMMY_PLACES omitting the placeId to be removed, keeping all that dont match
  // and overrides the old array
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  // if i want to return the place declare it above first.
  // only returning a message for now
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

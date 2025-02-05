// require = imports in nodeJS
const express = require("express");

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

// controller functions should not be executed her just pointed at where to execute when
// a request reaches the route
router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlaceByUserId);

router.post("/", placesControllers.createPlace);
module.exports = router;

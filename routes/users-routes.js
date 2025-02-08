// require = imports in nodeJS
const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controllers");

const router = express.Router();

// controller functions should not be executed her just pointed at where to execute when
// a request reaches the route
router.get("/", userControllers.getUsers);

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

module.exports = router;

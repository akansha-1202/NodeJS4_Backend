const category = require("../controller/categoryController");
// const authorization = require("../middleware/authorization");

const categoryRoute = require("express").Router();

// categoryRoute.get("/category",authorization, category); //specific middleware
categoryRoute.get("/category", category);

module.exports = categoryRoute;

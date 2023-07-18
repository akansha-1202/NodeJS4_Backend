const { register, login } = require("../controller/userController");

const userRoute = require("express").Router();

userRoute.post("/register", register);
userRoute.post("/login", login);

module.exports = userRoute;
//   console.log("Server started which contains category and user route");

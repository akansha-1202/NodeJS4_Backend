const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const categoryRoute = require("./routingFiles/categoryRoute");
const userRoute = require("./routingFiles/userRoute");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 4000;
// var SECRETKEY = process.env.SECRETKEY;
// console.log(SECRETKEY);
app.use(express.json()); //work as a body parser
app.use("/api/user", userRoute);
//http://localhost:4000/api/user/register
app.use("/api", categoryRoute);
//http://localhost:4000/api/category

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} which contains category and user route`
  );
});
// app.listen(4000, () => {
//   console.log("Server running on port which contains category and user route");
// });

//There will be a Login and Signup functionality
//until the user is not registered don't show the data
//if the user persons token is expired then automatically logout

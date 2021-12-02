const express = require("express");
const authentication = require("./../../routers/middleware/authentication");
const authorization = require("./../../routers/middleware/authorization");
const {
  login,
  signup,
  getallUser,
  deleteUser,
} = require("./../controllers/user");

const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/allusers", getallUser);
userRouter.delete("/delusers/:id", deleteUser);
module.exports = userRouter;

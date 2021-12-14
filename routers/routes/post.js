const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const { getallpost, createpost, deletepost, addLike  } = require("./../controllers/post");

const postRouter = express.Router();

postRouter.get("/getpost", getallpost);
postRouter.post("/createpost", createpost);
postRouter.delete("/deletepost/:id", authentication, deletepost);
postRouter.put("/addLike:id", addLike);


module.exports = postRouter;

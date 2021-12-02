const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const { getallpost, createpost, deletepost, deleteLike, addLike  } = require("./../controllers/post");

const postRouter = express.Router();

postRouter.get("/getpost", getallpost);
postRouter.post("/createpost", authentication, createpost);
postRouter.delete("/deletepost/:id", authentication, deletepost);
postRouter.post("/addLike", authentication, addLike);
postRouter.delete("/disLike/:id", authentication, deleteLike);

module.exports = postRouter;

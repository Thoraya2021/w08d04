const express = require("express");

const { getallpost, createpost, deletepost } = require("./../controllers/post");

const postRouter = express.Router();

postRouter.get("/getpost", getallpost);
postRouter.post("/createpost", createpost);
postRouter.delete("/deletepost/:id", deletepost);

module.exports = postRouter;

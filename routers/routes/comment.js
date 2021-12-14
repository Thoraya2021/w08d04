const express = require("express");
//const authentication =require('./../../routers/middleware/authentication')
const {
  getComments,
  createcomment,
  deleteComment,
  updateComment,
} = require("./../controllers/comment");

const commentRouter = express.Router();


commentRouter.post("/allcomment",getComments );
commentRouter.post("/createcomment", createcomment);
commentRouter.delete("/deletecomment/:id", deleteComment);
commentRouter.put("/updatecomment/:id", updateComment);

module.exports = commentRouter;

const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const {createcomment ,  deleteComment,  updateComment }=require ('./../controllers/comment');

const commentRouter = express.Router();


commentRouter.post("/createcomment",authentication, createcomment);
commentRouter.delete("/deletecomment/:id",authentication,deleteComment);
commentRouter.put("/updatecomment/:id", authentication, updateComment );


module.exports = commentRouter ;


const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const {createcomment , deletecomment ,updatecomment}=require ('./../controllers/comment');

const commentRouter = express.Router();


commentRouter.post("/createcomment/:id",authentication, createcomment);
commentRouter.delete("/deletecomment/:id",authentication, deletecomment);
commentRouter.put("/updatecomment/:id", authentication,updatecomment);



module.exports = commentRouter ;


const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const {  getallcomment, getcommentById ,createcomment  ,deletecomment ,updatecomment}=require ('./../controllers/comment');

const commentRouter = express.Router();



commentRouter.get("/comment", getallcomment  );
commentRouter.get("/comment/:id", authentication, getcommentById  );
commentRouter.post("/create",authentication, createcomment);
commentRouter.delete("/delete/:id",authentication, deletecomment);
commentRouter.put("/update/:id", authentication,updatecomment);



module.exports = commentRouter ;


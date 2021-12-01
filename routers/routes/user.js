const express = require('express')
const authentication =require('./../../routers/middleware/authentication')
const authorization=require('./../../routers/middleware/authorization')
const  {login, signup ,getallUser,deleteUser} = require('./../controllers/user')
const userRouter = express.Router()
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.get("/allusers", authentication, authorization, getallUser);
userRouter.delete("/users/:id", authentication, authorization, deleteUser);
module.exports = userRouter;
const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const authorization=require('./../../routers/middleware/authorization')

const { create, roles } = require("./../controllers/role");
const roleRouter = express.Router();
roleRouter.post("/create", create);
roleRouter.get("/roles",authentication,authorization, roles);

module.exports = roleRouter;
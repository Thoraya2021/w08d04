const express = require("express");

const {  getallpost , createpost ,  deletepost } = require('./../controllers/post');

const postRouter = express.Router();

postRouter.get("/get",  getallpost );
postRouter.post("/create", createpost  );
postRouter.delete("/delete",  deletepost  );


module.exports = postRouter;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./db/index");



const app = express();
dotenv.config();

const roleRouter = require('./routers/routes/role');
const userRouter = require("./routers/routes/user");
const postRouter=require('./routers/routes/post')
const commentRouter =require('./routers/routes/comment')


app.use(express.json({limit:"30mb", extended: true}));
app. use(express.urlencoded({limit: " 30mb" , extended: false}))
//app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(roleRouter)
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
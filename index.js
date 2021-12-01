const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./db/index");


const app = express();
dotenv.config();

const roleRouter = require('./routers/routes/role');
const userRouter = require("./routers/routes/user");
const postRouter=require('./routers/routes/post')



app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(roleRouter)
app.use(userRouter);
app.use(postRouter);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
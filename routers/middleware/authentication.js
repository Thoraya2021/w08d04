var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const authentication =(req,res,next)=>{
try{
    if(!req,headers.authentication)
    return res.status(403).json({message:"forbidden"});
    const token=req.headers.authentication.split("")[1];
    const SECRET_KEY = process.env.SECRET_KEY;
    const parsedToken=jwt.verify(token,SECRET_KEY);
    req.token=parsedToken;

    next();
}
catch (err) {
    res.status(403).json(err);
  }
};
 module.exports = authentication;

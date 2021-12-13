const usermodel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const getallUser = (req, res) => {
  usermodel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUser  = (req, res) => {
  const { id } = req.params;
  usermodel
     .findByIdAndUpdate(id, { $set: { isDel: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("the User has deleted");
      } else {
        res.status(404).json("the User not found");
      }
    })
    
    .catch((err) => {
      res.status(400).json(err);
    });
};

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const SALT = Number(process.env.SALT);
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newuser = new usermodel({
    email: savedEmail,
    password: hashedPassword,
    username,
  });

/*
if (email && username) {
  let userregister = await user.findOne({
  $or: [
  {username:username},
  {email:email}]
  
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  
  if (userregister == null){
    res.status(200).json("not fount");
  
  }
  else{
  if (email == userregister.email){
  
    res.status(200).json(" Email  already used .");
  
  }
  else {
    
    res.status(200).json(" Username already used .");
  }
  }
*/  
  newuser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(" Email Or Username already used .");
    });
};


const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  usermodel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (email.toLowerCase() === result.email) {
          const unhashPassword = await bcrypt.compare(
            password,
            result.password
          );
          if (unhashPassword) {
            const payload = {
              role: result.role,
            };
            const options = {
              expiresIn: "60m",
            };
            const token = await jwt.sign(payload, SECRET_KEY, options);

            res.status(200).json({ result, token});
          } else {
            res.status(400).json("invalid email or password");
          }
        
      } 
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
module.exports = { signup, login, getallUser, deleteUser };
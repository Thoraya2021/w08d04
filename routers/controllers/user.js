const usermodel = require('./../../db/models/user')
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


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

const deleteUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  usermodel.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("user has deleted");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const signup= async (req, res) =>{
    const { email, password, role } = req.body;
    const SALT = Number(process.env.SALT);
    const savedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, SALT);
    const newUser = new usermodel({
      email: savedEmail,
      password: hashedPassword,
      role
    });
  
    newUser
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  
  const login = (req, res) => {
    const { email, password } = req.body;
    const SECRET_KEY = process.env.SECRET_KEY;
    usermodel
      .findOne({ email })
      .then(async (result) => {
        if (result) {
          if (email === result.email) {
  
            const payload={
              role:result.role
            }
  
            const options={
              expiresIn: 60*60
            }
  
            const token =await jwt.sign(payload, SECRET_KEY, options)
            console.log(token);
  
         const unhashPassword = await bcrypt.compare(password, result.password)
  
            if (unhashPassword) {
              res.status(200).json(result);
            } else {
              res.status(400).json("invalid email or password");
            }
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("email do not found");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
      module.exports= { signup , login ,getallUser,deleteUser}
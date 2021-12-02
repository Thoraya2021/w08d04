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

const deleteUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  usermodel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("user has deleted");
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
  const newUser = new usermodel({
    email: savedEmail,
    password: hashedPassword,
    username,
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

            res.status(200).json({result, token});
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
      console.log(err);
      res.status(400).json(err);
    });
};
module.exports = { signup, login, getallUser, deleteUser };

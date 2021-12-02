const mongoose = require("mongoose");
const usermodel = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, default: false },
    avatar: { type: String, required: false },
    isDel: { type: Boolean, default: false },
    role:{type: mongoose.Schema.Types.ObjectId, ref: "role",default:"61a86bb7d10e31f22c0a3301"},
  });
  module.exports =mongoose.model('User', usermodel);
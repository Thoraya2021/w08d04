const mongoose = require("mongoose");
const usermodel = new mongoose.Schema({
    email: { type: String,unique:true, required: true },
    username: { type: String,unique:true, required: true },
    password: { type: String, default: false },
    avatar: { type: String, default :"https://th.bing.com/th/id/R.231f4ddf4c8e49439dc6f2bf602208da?rik=DPlJ9oUGNuPO%2bw&riu=http%3a%2f%2flogitracgps.com%2fassets%2fimg%2flogin%2flogin-icon.png&ehk=tnCgB5ZLKwqfOkJh%2b%2fL1NFxOH7ZuxZx6dGHtl3Vr9UQ%3d&risl=&pid=ImgRaw&r=0"},
    isDel: { type: Boolean, default: false },
    role:{type: mongoose.Schema.Types.ObjectId, ref: "role",default:"61a86bb7d10e31f22c0a3301"},
    like:[{type: mongoose.Schema.Types.ObjectId, ref: "post"}]
  });
  module.exports =mongoose.model('User', usermodel);
const mongoose = require("mongoose");
const postmodel = new mongoose.Schema({
    img: { type: String ,required:false},
    desc: { type: String, required: true },
    isDel: { type: Boolean, default: false },
    date: { type: Number },
    like:{type:Array,required: false},
    user:[{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  });
module.exports =mongoose.model('post',postmodel)
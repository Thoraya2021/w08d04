const mongoose = require("mongoose");
const postmodel = new mongoose.Schema({
    img: { type: String ,required:false},
    desc: { type: String, required: true },
    isDel: { type: Boolean, default: false },
    comment:{ type: mongoose.Schema.Types.ObjectId, ref: "comment" },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    like:  { type: mongoose.Schema.Types.ObjectId, ref: "Like" },
  },
  {timestamps: true}
  );
module.exports =mongoose.model('post',postmodel);
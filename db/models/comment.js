const mongoose = require("mongoose");
const comment = new mongoose.Schema({
    text: { type: String, required: true },
    isDel: { type: Boolean, default: false },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post:{ type: mongoose.Schema.Types.ObjectId, ref: "post" },
 }
  ,
{timestamps: true}
);
module.exports =mongoose.model('comment',comment)
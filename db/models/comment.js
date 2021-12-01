const mongoose = require("mongoose");
const comment = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Number },
    isDel: { type: Boolean, default: false },
    user: { type: String ,required:true},
    post:[{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],

  });
module.exports =mongoose.model('comment',comment)
const mongoose = require("mongoose");
const comment = new mongoose.Schema({
    text: { type: String, required: true },
    deta: { type: Number, required: true },
    user: { type: String ,required:true},
    post:[{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],

  });
module.exports =mongoose.model('comment',comment)
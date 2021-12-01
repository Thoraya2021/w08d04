const mongoose = require("mongoose");
const likemodel = new mongoose.Schema({
  like: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Like", likemodel);
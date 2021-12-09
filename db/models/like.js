const mongoose = require("mongoose");
const likemodel = new mongoose.Schema({
  like: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
});
module.exports = mongoose.model("Like", likemodel);
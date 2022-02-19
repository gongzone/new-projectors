const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: {},
  content: {},
  image,
});

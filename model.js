const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogPost = new Schema({
  name: String,
  tugBoatId: Number,
});

module.exports = mongoose.model("queue", BlogPost);

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    postDesc: { type: String },
    img: String,
    location: String,
    showLocation: { type: Boolean, default: true },
    feeling: String,
    likes: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

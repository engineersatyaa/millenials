const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    commenterId: { type: String, required: true },
    comment: { type: String, required: true },
    likes: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

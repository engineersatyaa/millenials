const Comment = require("../models/Comment");

//==========================================================

const createCommnet = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const getAllComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted.");
  } catch (error) {
    next(error);
  }
};

//==========================================================

const updateComment = async (req, res, next) => {
  try {
    const updatedCommnet = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCommnet);
  } catch (error) {
    next(error);
  }
};

module.exports = { createCommnet, getAllComment, deleteComment, updateComment };

const Post = require("../models/Post");
const User = require("../models/User");

//==========================================================

const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ msg: "Post has been deleted." });
  } catch (error) {
    next(error);
  }
};

//==========================================================

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//==== Only User's All Post ==================================

const getUserAllPost = async (req, res, next) => {
  try {
    const userPosts = await Post.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(userPosts);
  } catch (error) {
    next(error);
  }
};

//==== Get all posts of user and his following peoples ========
const getAllPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: req.params.userId });
    const friendPosts = await Promise.all(
      user?.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    // adding both userPosts Array and friendPosts Array.
    const combinedPosts = userPosts.concat(...friendPosts);

    // sorting combinedPosts Array by time (new posts first).
    const sortedPosts = combinedPosts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json(sortedPosts);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const likeUnlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.body.postId);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      const updatedPost = await Post.findById(req.body.postId);
      res.status(200).json({ updatedPost, msg: "Post has been liked." });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });

      const updatedPost = await Post.findById(req.body.postId);
      res.status(200).json({ updatedPost, msg: "Post has been unliked." });
    }
  } catch (error) {
    next(error);
  }
};

//==========================================================

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getUserAllPost,
  getAllPost,
  likeUnlikePost,
};

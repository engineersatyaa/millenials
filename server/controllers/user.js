const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//==========================================================

// Using same function to get User or Following or Follower.
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.userId || req.params.followingId || req.params.followerId
    );
    const { password, isAdmin, ...others } = user?._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

//===== Write Code to Find User by Name or City or Country ====
//==========================================================

const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ updatedUser, msg: "User details have been updated." });
  } catch (error) {
    next(error);
  }
};

//==========================================================

const deleteUser = async (req, res, next) => {
  try {
    const toBeDeletedUser = await User.findById(req.params.userId);

    // Removing to be deleted user's ID from other user's "followers" array.
    toBeDeletedUser.followings.map(async (followingUserId) => {
      await User.findByIdAndUpdate(followingUserId, {
        $pull: { followers: req.params.userId },
      });
    });

    // Removing to be deleted user's ID from other user's "followings" array.
    toBeDeletedUser.followers.map(async (followerUserId) => {
      await User.findByIdAndUpdate(followerUserId, {
        $pull: { followings: req.params.userId },
      });
    });

    // Deleting to be deleted user's all posts.
    await Post.deleteMany({ userId: req.params.userId });

    // Finally deleting user.
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json("User has been deleted.");
  } catch (error) {
    next(error);
  }
};

//==========================================================

const followUnfollowUser = async (req, res, next) => {
  try {
    const otherUser = await User.findById(req.body.otherUserId);
    const currentUser = await User.findById(req.body.userId);

    if (!otherUser.followers.includes(req.body.userId)) {
      await otherUser.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({
        $push: { followings: req.body.otherUserId },
      });
      res.status(200).json("User has been followed.");
    } else {
      await otherUser.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({
        $pull: { followings: req.body.otherUserId },
      });
      res.status(200).json("User has been unfollowed.");
    }
  } catch (error) {
    next(error);
  }
};

//==========================================================

const getAllFollowings = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const followingsList = await Promise.all(
      currentUser.followings.map(async (followingUserId) => {
        const followingUser = await User.findById(followingUserId);

        const { _id, userName, profilePic, city, country } = followingUser;

        // Returning object of above destructured variables
        return { _id, userName, profilePic, city, country };
      })
    );

    res.status(200).json(followingsList);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const getAllFollowers = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const followersList = await Promise.all(
      currentUser.followers.map(async (followerId) => {
        const followerUser = await User.findById(followerId);

        const { _id, userName, profilePic, city, country } = followerUser;

        // Returning object of above destructured variables
        return { _id, userName, profilePic, city, country };
      })
    );

    res.status(200).json(followersList);
  } catch (error) {
    next(error);
  }
};

//==========================================================

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  followUnfollowUser,
  getAllFollowings,
  getAllFollowers,
};

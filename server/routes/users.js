const router = require("express").Router();
const { verifyUserOrAdmin, verifyToken } = require("../utils/verify");
const {
  getUser,
  updateUser,
  deleteUser,
  followUnfollowUser,
  getAllFollowings,
  getAllFollowers,
} = require("../controllers/user");

// get user
router.get("/get_user/:userId", getUser);

// get single following person
router.get("/get_following/:followingId", getUser);

// get single follower
router.get("/get_follower/:followerId", getUser);

// update user
router.put("/update_user/:userId", updateUser); // Add verifyUserOrAdmin middleware later

// delete user
router.delete("/delete_user/:userId", deleteUser); // Add verifyUserOrAdmin middleware later

// follow or unfollow user
router.put("/follow_unfollow", followUnfollowUser); // Add verifyToken middleware later

// get all followings list
router.get("/followings/:userId", getAllFollowings);

// get all followers list
router.get("/followers/:userId", getAllFollowers);

module.exports = router;

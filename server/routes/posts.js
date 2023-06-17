const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  getPost,
  getAllPost,
  getUserAllPost,
} = require("../controllers/post");

// create post
router.post("/create_post", createPost);

// update post
router.put("/update_post/:postId", updatePost);

// delete post
router.delete("/delete_post/:postId", deletePost);

// get post
router.get("/get_post/:postId", getPost);

// get only user's all post (For User's Timeline)
router.get("/get_user_all_post/:userId", getUserAllPost);

// get all post of user and his following peoples (For Homepage)
router.get("/get_all_post/:userId", getAllPost);

// like or unlike post
router.put("/like_unlike_post", likeUnlikePost);

module.exports = router;

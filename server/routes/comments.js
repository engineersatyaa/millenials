const router = require("express").Router();
const {
  createCommnet,
  getAllComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

// Create comment
router.post("/create_comment", createCommnet);

// Get all comments
router.get("/get_all_comments/:postId", getAllComment);

// Update comment
router.put("/update_comment/:commentId", updateComment);

// Delete comment
router.delete("/delete_comment/:commentId", deleteComment);

module.exports = router;

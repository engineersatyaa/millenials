const router = require("express").Router();
const { createMsg, getMsgs } = require("../controllers/message");

// create msg
router.post("/create_msg", createMsg);

//get msg
router.get("/get_msgs/:chatId", getMsgs);

module.exports = router;

const router = require("express").Router();
const { createChat, getChats } = require("../controllers/chat");

// new chat
router.post("/create_chat", createChat);

// get all chats of a user
router.get("/get_chats/:userId", getChats);

module.exports = router;

const Chat = require("../models/Chat");

//==========================================================
const createChat = async (req, res, next) => {
  try {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    next(error);
  }
};

//==========================================================
const getChats = async (req, res, next) => {
  try {
    const chat = await Chat.find({ members: { $in: [req.params.userId] } });
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

module.exports = { createChat, getChats };

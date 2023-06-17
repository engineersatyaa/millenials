const Message = require("../models/Message");

//==========================================================
const createMsg = async (req, res, next) => {
  try {
    const newMsg = new Message(req.body);
    const savedMsg = await newMsg.save();
    res.status(201).json(savedMsg);
  } catch (error) {
    next(error);
  }
};

//==========================================================
const getMsgs = async (req, res, next) => {
  try {
    const msgs = await Message.find({ chatId: req.params.chatId });
    res.status(200).json(msgs);
  } catch (error) {
    next(error);
  }
};

module.exports = { createMsg, getMsgs };

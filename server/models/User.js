const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    phoneEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profilePic: { type: String, default: "" },
    coverPic: { type: String, default: "" },
    place: { type: String, default: "" },
    education: { type: String, default: "" },
    profession: { type: String, default: "" },
    relationship: { type: String, default: "" },
    aboutMe: { type: String, default: "" },
    followers: { type: Array },
    followings: { type: Array },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

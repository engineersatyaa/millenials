const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

//==========================================================

const register = async (req, res, next) => {
  try {
    // Checking for already registered user with provided Phone Number or E-mail.
    const isUserAlreadyRegistered = await User.findOne({
      phoneEmail: req.body.phoneEmail,
    });

    if (isUserAlreadyRegistered)
      return next(
        createError(
          400,
          `Someone is already registered with  " ${req.body.phoneEmail} "`
        )
      );

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      userName: req.body.userName,
      phoneEmail: req.body.phoneEmail,
      gender: req.body.gender,
      password: hash,
    });

    await newUser.save();
    const user = await User.findOne({ phoneEmail: req.body.phoneEmail });
    const { password, isAdmin, ...others } = user._doc;

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(others);
  } catch (error) {
    next(error);
  }
};

//==========================================================

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ phoneEmail: req.body.phoneEmail });
    if (!user)
      return next(createError(404, "Incorrect phone number or email."));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(401, "Incorrect password."));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...others } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };

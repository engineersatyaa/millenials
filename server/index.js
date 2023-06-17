const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 1010;
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const chatRoute = require("./routes/chats");
const msgRoute = require("./routes/messages");
const commentRoute = require("./routes/comments");

//========== Database Connection =================

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

//========== Middlewares ==========================
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //It parses (req.body) incoming requests with JSON payloads and is based on body-parser.
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", msgRoute);
app.use("/api/comments", commentRoute);

//========== Error Handler Middleware ==============

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Hey...Internal Server Error";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

//===================================================

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

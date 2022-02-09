const express = require("express");

const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");

const app = express();
app.use(express.json());

// this request for user registration
app.use("/api/user", userRouter);

// this request fro user authentication
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Express Server !");
});

module.exports = app;

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");

// define express router for route url request !

const router = express.Router();

// auth user

const authUser = async (req, res) => {
  // check email and response

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password !");

  // check password and response

  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) return res.status(400).send("Invalid email or password !");

  // json web token for singIn user

  const token = user.generateJWT();

  res.send({ token: token });
};

router.route("/").post(authUser);

module.exports = router;

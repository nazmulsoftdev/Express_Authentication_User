const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");

// define express router for route url request !

const router = express.Router();

// this is post request

const newUser = async (req, res) => {
  // check email validation if old email is exist ?

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("Sorry this user email already exist !");

  // store user information from body request !

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // password bcrypt

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //   Save user data in database !
  try {
    let result = await user.save();

    // json web token send for singUp user
    const token = user.generateJWT();

    res.send({
      token: token,
      data: {
        name: result.name,
        email: result.email,
      },
    });
  } catch (err) {
    const errorMsg = [];
    for (field in err.errors) {
      errorMsg.push(err.errors[field].message);
    }
    return res.status(400).send(errorMsg);
  }
};

// this is get request

const getUser = async (req, res) => {
  try {
    const result = await User.find().select({ name: 1 });
    if (result.length === 0)
      return res.status(400).send("Sorry we don't have data !");
    res.send(result);
  } catch (err) {
    return res.status(400).send("Sorry we don't have data !");
  }
};

router.route("/").get(getUser).post(newUser);

module.exports = router;

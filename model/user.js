const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
// define the shape of schema

const userSchema = Schema({
  name: {
    type: String,
    require: [true, "Name is required !"],
    minlength: 6,
    maxlength: 16,
  },
  email: {
    type: String,
    require: [true, "Email is required !"],
    minlength: 8,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is required !"],
    minlength: 5,
    maxlength: 1024,
  },
});

//pass json web token method in userSchema

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.mySecretKey
  );
  return token;
};

//   Crete a model

const User = model("data-store", userSchema);

module.exports = User;

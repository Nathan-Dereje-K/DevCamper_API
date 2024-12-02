const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    required: [true, "Please add your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [8, "Password should be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["publisher", "user"],
    default: "user",
  },
  passwordReset: String,
  resetToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encript the user password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare the hased password with the plain passsword
UserSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

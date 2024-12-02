// register, login

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @Desc       Register
// @Route      POST /api/v1/auth/register
// @Access     Public
exports.register = asyncHandler(async (req, res) => {
  const { email, name, password, role } = req.body;

  // Create a user:
  const user = await User.create({
    email,
    name,
    password,
    role,
  });
  sendTokenResponse(user, 201, res);
});

// @Desc       Login
// @Route      POST /api/v1/auth/login
// @Access     Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password!", 400));
  }
  // Check if user exist
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials!", 401));
  }
  // Does it match the password in the DB ?
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials!", 401));
  }
  sendTokenResponse(user, 200, res);
});

// Get the token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  // Create a token
  const token = user.getSignedJwtToken();
  // Create cookie
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    option.secure = true;
  }
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    token: token,
  });
};

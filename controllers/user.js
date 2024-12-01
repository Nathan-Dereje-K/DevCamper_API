// register, login

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @Desc       display all Bootcamp
// @Route      GET /api/v1/bootcamps
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
  // Create a token
  const token = user.getSignedJwtToken();

  res.status(201).json({ success: true, data: user, jwtToken: token });
});

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

//verifies the token
exports.verifyJwt = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Unauthorized route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.uid);

    if (!user) {
      return next(new ErrorResponse("User not found(id)", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Unauthorized route", 401));
  }
};

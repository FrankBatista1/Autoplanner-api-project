const bcrypt = require('bcryptjs')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')


exports.signup = async (req, res, next) => {
  //checking for existent email
  const { email , name, password} = req.body
  if (!name || !email || !password) {
    return next(new ErrorResponse("Please provide an name, email and password", 400));
  }
  const testEmail = await User.findOne({email});
  if (testEmail) {
    return next(new ErrorResponse("Email already in use", 400))
  }
  //creating the new User and hashing the password
  const user = new User({name, email, password});
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(error)
  }
}
exports.login = async (req, res, next) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  //checking if the user exist
  if(!user){
    return next(new ErrorResponse("Please check credentials", 401))
  }
  //validating the hashed password
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(new ErrorResponse("Please check credentials", 401))
  }
  sendToken(user, 200, res);
}
exports.forgotPassword = async (req, res, next) => {
  res.send('Forgot Password test');
}
exports.resetPassword = async (req, res, next) => {
  res.send('Reset password test')
}

//res with the token generated in the User method
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

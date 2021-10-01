const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.signup = async (req, res, next) => {
  //checking for existent email
  const { email , name, password} = req.body
  const testEmail = await User.findOne({email}); // {email: req.body.email}
  if (testEmail) {
    return res.status(500).json({message: "Email already in use"});
  }
  //creating the new User and hashing the password
  const user = new User({name, email, password});
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the user"});
  }
}
exports.login = async (req, res, next) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  //checking if the user exist
  if(!user){
    return res.status(404).json({message: 'Please check credentials'})
  }
  //validating the hashed password
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(404).json({message: "Please check credentials"});
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({user, token});
}
exports.forgotPassword = async (req, res, next) => {
  res.send('Forgot Password test');
}
exports.resetPassword = async (req, res, next) => {
  res.send('Reset password test')
}
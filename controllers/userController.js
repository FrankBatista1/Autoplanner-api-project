const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    if (users.length === 0) {
     return res.status(400).json({message: "No users found"}); 
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: "Couldn't get the users"})
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message: "Couldn't get user"})
  }
}
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  try{
    return res.status(200).json('Succesfully deleted');
  }catch(error){
    return res.status(400).json("Couldn't delete user");
  }
}
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    if (users.length === 0) {
     return res.status(400).json({message: "No users found"}); 
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({message: "Couldn't get the users"})
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({message: "Couldn't get user"})
  }
}

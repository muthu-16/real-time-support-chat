const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await user.remove();
  res.json({ message: 'User deleted' });
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
};

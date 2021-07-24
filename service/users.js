const User = require('../model/schemas/user');

const findByEmail = async (email) => {

  return await User.findOne({ email });
};

const findById = async (id) => {

  return await User.findOne({ _id:id })
};

const create = async ({email, password, name}) => {
  const user = new User({email, password, name});

  return await user.save();
};

const updateToken = async (id, token) => {

  return await User.updateOne({ _id:id },{ token });
};

const updateAvatar = async (id, avatarURL) => {

  return await User.updateOne({ _id:id },{ avatarURL });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
};
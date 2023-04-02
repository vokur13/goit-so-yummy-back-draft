const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1w' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'Logout success',
  });
};

module.exports = {
  register: ctrlWrapper(register),
  //   verifyEmail: ctrlWrapper(verifyEmail),
  //   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  //   getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  //   updateAvatar: ctrlWrapper(updateAvatar),
};

const {
  getAll,
  getById,
  add,
  getByCategory,
  updateFavorites,
  deleteById,
} = require('./recipes');

const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require('./auth');

module.exports = {
  getAll,
  getById,
  add,
  getByCategory,
  updateFavorites,
  deleteById,
  register,
  // verifyEmail,
  // resendVerifyEmail,
  login,
  // getCurrent,
  logout,
  // updateAvatar,
};

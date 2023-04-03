const {
  getAll,
  getById,
  add,
  getByCategory,
  updateFavorites,
  getFavorites,
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
  getFavorites,
  deleteById,
  register,
  // verifyEmail,
  // resendVerifyEmail,
  login,
  // getCurrent,
  logout,
  // updateAvatar,
};

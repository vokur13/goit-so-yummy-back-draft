const {
  getAll,
  getById,
  add,
  getByCategory,
  updateFavorites,
  getAllFavorites,
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
  getAllFavorites,
  deleteById,
  register,
  // verifyEmail,
  // resendVerifyEmail,
  login,
  // getCurrent,
  logout,
  // updateAvatar,
};

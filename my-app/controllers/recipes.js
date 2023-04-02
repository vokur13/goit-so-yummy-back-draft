const { Recipe } = require('../models');

const { HttpError, ctrlWrapper } = require('../helpers/');

const getAll = async (req, res) => {
  const result = await Recipe.find();
  res.json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await recipes.getById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

// const getByCategory = async (req, res) => {
//   const { alias } = req.params;
//   const result = await recipes.getByCategory(alias);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

const add = async (req, res) => {
  const result = await Recipe.create(req.body);
  res.status(201).json(result);
};

// const deleteById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await recipes.deleteById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   // res.status(204).send();
//   res.json({ message: 'Delete success' });
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // getByCategory: ctrlWrapper(getByCategory),
  add: ctrlWrapper(add),
  // deleteById: ctrlWrapper(deleteById),
};

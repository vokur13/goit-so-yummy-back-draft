const { Recipe } = require('../models');

const { HttpError, ctrlWrapper } = require('../helpers/');

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const options = {
    page,
    limit,
  };

  const result = await Recipe.paginate(
    Recipe.find({}).populate(
      'title category area time popularity favorites tags'
    ),
    options
  );

  // const result = await Recipe.find(
  //   {},
  //   'title category area time populatiry favorites tags'
  // );
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const getByCategory = async (req, res) => {
  const { alias } = req.params;
  const result = await Recipe.find({ category: alias }, 'title category');
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Recipe.create(req.body);
  res.status(201).json(result);
};

const updateFavorites = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json({ result });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Recipe.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  // res.status(204).send();
  res.json({ message: 'Delete success' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  getByCategory: ctrlWrapper(getByCategory),
  add: ctrlWrapper(add),
  updateFavorites: ctrlWrapper(updateFavorites),
  deleteById: ctrlWrapper(deleteById),
};

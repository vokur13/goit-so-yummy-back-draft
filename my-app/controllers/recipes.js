const { Recipe, User } = require('../models');

const { HttpError, ctrlWrapper } = require('../helpers/');

const getAll = async (req, res) => {
  // const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;

  const options = {
    page,
    limit,
  };

  const result = await Recipe.paginate(
    // Recipe.find({owner})
    Recipe.find(
      {},
      'title category area time popularity favorites tags'
    ).populate('owner', 'name'),
    options
  );
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
  const { _id: owner } = req.user;
  const result = await Recipe.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { favorites } = req.query;

  // const user = await User.findById(owner);
  // await User.findByIdAndUpdate(
  //   owner,
  //   { $addToSet: { favorites: id } },
  //   { new: true }
  // );

  const result =
    favorites === 'true'
      ? (await User.findByIdAndUpdate(owner, {
          $addToSet: { favorites: id },
        })) &&
        (await Recipe.findByIdAndUpdate(
          id,
          { $addToSet: { favorites: owner } },
          { new: true }
        ))
      : (await User.findByIdAndUpdate(owner, { $pull: { favorites: id } })) &&
        (await Recipe.findByIdAndUpdate(
          id,
          { $pull: { favorites: owner } },
          { new: true }
        ));

  // await User.findByIdAndUpdate(
  //   owner,
  //   { $addToSet: { favorites: id } }
  //   // { new: true }
  // );

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.json({ result });
};

const getFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;

  const options = {
    page,
    limit,
  };

  const result = await Recipe.paginate(
    Recipe.find(
      { favorites: { $in: [owner] } },
      'title category area popularity'
    ).populate(),
    options
  );
  res.json(result);
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
  getFavorites: ctrlWrapper(getFavorites),
  deleteById: ctrlWrapper(deleteById),
};

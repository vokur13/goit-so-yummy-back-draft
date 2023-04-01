const Joi = require('joi');

const recipes = require('../models/recipes');

const { HttpError, ctrlWrapper } = require('../helpers/');

const addSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string(),
  thumb: Joi.string(),
  preview: Joi.string(),
});

const getAll = async (req, res, next) => {
  const result = await recipes.getAll();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await recipes.getById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const getByCategory = async (req, res, next) => {
  const { alias } = req.params;
  const result = await recipes.getByCategory(alias);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await recipes.add(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await recipes.deleteById(id);
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
  deleteById: ctrlWrapper(deleteById),
};

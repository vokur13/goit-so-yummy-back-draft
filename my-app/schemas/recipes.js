const Joi = require('joi');

const addSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string(),
  thumb: Joi.string(),
  preview: Joi.string(),
});

module.exports = { addSchema };

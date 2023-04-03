const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const { handleMongooseError } = require('../helpers');

const category = [
  'Beef',
  'Breakfast',
  'Chicken',
  'Dessert',
  'Goat',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
];

const Joi = require('joi');

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    area: { type: String, required: true },
    instructions: { type: String },
    description: { type: String },
    thumb: { type: String },
    preview: { type: String },
    time: { type: String },
    popularity: { type: Number },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    // favorites: {
    //   type: Boolean,
    //   default: false,
    // },
    // youtube: String,
    tags: {
      type: String,
      enum: category,
      //   required: true,
    },
    // tags: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'category',
    //   required: true,
    // },
    // ingredients: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'ingredients',
    //   required: true,
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string(),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string(),
  popularity: Joi.number(),
  // favorites: Joi.boolean(),
  tags: Joi.string()
    .valid(...category)
    .required(),
});

const updateFavoriteSchema = Joi.object({
  // favorites: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

recipeSchema.plugin(mongoosePaginate);

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = { Recipe, schemas };

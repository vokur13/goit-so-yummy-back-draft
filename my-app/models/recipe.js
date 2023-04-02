const mongoose = require('mongoose');

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
    favorites: {
      // type: Schema.Types.ObjectId,
      // ref: 'user',
      // required: true,
    },
    // youtube: String,
    tags: {
      type: String,
      enum: [
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
      ],
      required: true,
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
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'user',
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = { Recipe };

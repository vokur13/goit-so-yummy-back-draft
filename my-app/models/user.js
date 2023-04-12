const mongoose = require('mongoose');

const { handleMongooseError } = require('../helpers');

const Joi = require('joi');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'recipe',
      },
    ],
    token: { type: String, default: '' },
  },

  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  // favorites: Joi.array(),
});

// const emailSchema = Joi.object({
//   email: Joi.string().pattern(emailRegex).required(),
// });

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  // emailSchema
};

const User = mongoose.model('user', userSchema);

module.exports = { User, schemas };

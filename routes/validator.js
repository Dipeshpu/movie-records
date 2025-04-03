const Joi = require('joi');

const validateUser = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
  phone_no: Joi.string()
  .custom((value, helpers) => {
    // Case 1: Phone number has length 10
    if (value.length === 10) {
      if (parseInt(value[0]) <= 6) {
        return helpers.error('any.invalid');
      }
    }
    // Case 2: Phone number has length 13 and starts with +91
    if (value.length === 13) {
      if (!value.startsWith('+91')) {
        return helpers.error('any.invalid');
      }
      if (parseInt(value[3]) <= 6) {
        return helpers.error('any.invalid');
      }
    }
    return value;
  })
  .regex(/^\d{10,13}$/).required()
    .error(errors => {
      return errors.map(err => {
        if (err.type === "string.regex.base") {
          err.message = "Phone number must contain only numbers and be 10-12 digits long"
        }
        else if (err.type === "any.invalid")
          err.message = "Phone number is incorrect format."
        else if (err.type === "any.empty")
          err.message = "Phone number is required"
        return err;
      });
    }),
  is_admin: Joi.boolean() || false
});

const validateMovie = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  lang: Joi.string().min(3).max(10).required(),
  release_date: Joi.date().required(),
  duration : Joi.number().integer().required(),
  genre_id: Joi.number().integer().required(),
  actor_id: Joi.array().items(Joi.number().required()).required(),
  director_id: Joi.array().items(Joi.number().required()).required()
});


const validateloginCredential = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
});


const validateId = Joi.object({
  id: Joi.number().integer().required()
});

const validateGenrePeople = Joi.object({
  name: Joi.string().min(5).max(255).required(),
});

const validateMovieData = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  duration : Joi.number().integer().required(),
  release_date: Joi.date().required(),
});

exports.validateUser = validateUser;
exports.validateMovie = validateMovie;
exports.validateloginCredential = validateloginCredential;
exports.validateId = validateId;
exports.validateGenrePeople = validateGenrePeople;
exports.validateMovieData = validateMovieData;

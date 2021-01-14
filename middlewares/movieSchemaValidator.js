const Joi = require("@hapi/joi");
const HttpException = require('../utility/HttpException')

/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */ 

 const schema = Joi.object({
   title: Joi.string().min(1).max(60).required(),
   year:  Joi.number().min(1).max(3000).required(),
   genre: Joi.string().min(1).max(50).required()
 });

const movieSchemaValidator = async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return next(
      new HttpException("UnprocessableEntity", error.details[0].message)
    );
  }
};


module.exports =  movieSchemaValidator;

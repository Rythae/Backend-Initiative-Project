const Joi = require("@hapi/joi");
const HttpException = require("../utility/HttpException");

/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */

const schema = Joi.object({
  title: Joi.string().min(1).max(60).required(),
  date_collected: Joi.string().min(1).max(50).required(),
  date_returned: Joi.string().min(1).max(50).required(),
  status: Joi.string().min(1).max(50).required(),
  // movieId: Joi.number()
});

const rentalSchemaValidator = async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return next(
      new HttpException("UnprocessableEntity", error.details[0].message)
    );
  }
};

module.exports = rentalSchemaValidator;

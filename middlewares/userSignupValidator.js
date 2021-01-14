const Joi = require("@hapi/joi");
const HttpException = require('../utility/HttpException')


/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */
const schema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(8).max(60).required().email(),
  password: Joi.string()
    .regex(/^[a-zA-Z 0-9@.+-@#$&]+$/)
    .min(6)
    .max(40)
    .required(),
});
const userSignupValidator = async (req, res, next) => {
  try {
    await schema.validate(req.body)
    next();
  } catch (error) {
    return next(
      new HttpException("UnprocessableEntity", error.details[0].message)
    );
  }
};


module.exports =  userSignupValidator;

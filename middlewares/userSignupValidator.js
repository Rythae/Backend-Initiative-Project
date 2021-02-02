const Joi = require("@hapi/joi");
const HttpException = require('../utility/HttpException')
const ResponseHelper = require("../utility/ResponseHelper");
const Model = require('../database/models')
const { User } = Model;


/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */
const schema = Joi.object({
  username: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(8).max(60).required().email(),
  password: Joi.string()
    .regex(/^[a-zA-Z 0-9@.+-@#$&]+$/)
    .min(6)
    .max(40)
    .required(),
});
const userSignupValidator = async (req, res, next) => {
  const { username, email, password } = req.body;
 
  try {
    await schema.validate(req.body)
     const user = await User.findOne({ where: { email } });
     if (!email) {
       return ResponseHelper.error(res, 404, {
         message: "email is required",
       });
     }
     if (!username) {
       return ResponseHelper.error(res, 404, {
         message: "username is required",
       });
     }
     if (!password) {
       return ResponseHelper.error(res, 404, {
         message: "password is required",
       });
     }
  
     if (user) {
       return ResponseHelper.error(res, 409, {
         message: "User already exists",
       });
     }
    next();
  } catch (error) {
    return next(
      new HttpException("UnprocessableEntity", error.message)
    );
  }
};


module.exports =  userSignupValidator;

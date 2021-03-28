const jwt = require('jsonwebtoken')
const HttpException = require("../utility/HttpException");
const ResponseHelper = require("../utility/ResponseHelper");
const dotenv = require("dotenv");
const Model = require("../database/models");
const { User } = Model;

dotenv.config();

/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {JsonResponse} - the json response
 */
const tokenVerification = async(req, res, next) => {
  const token = req.headers.authorization
        if (!token) {
          return ResponseHelper.error(res, 401, {
            message: "Unauthorized",
          });
        }
       jwt.verify(
         token,
         process.env.JWT_SECRET,
           { expiresIn: "5mins" }, (error, decoded) => {
             if (error) {
               return ResponseHelper.error(res, 401, { error });  
               }
               req.decoded = decoded
               User.findByPk(decoded.userId).then((user) => {
                 if (!user) {
                   return ResponseHelper.error(res, 401, {
                     message: "User does not exist",
                   });
                 }
                 next();
               });
         }
       ); 
    }

module.exports = tokenVerification;

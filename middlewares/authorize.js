const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Model = require("../database/models");
const { User } = Model;
const ResponseHelper = require("../utility/ResponseHelper");

dotenv.config();

module.exports = {
  async (req, res, next) {
        if (!req.headers.authorization) {
            return ResponseHelper.error(res, 401, {
            message: "Unathorized",
        });
        }
        const token = req.headers.authorization.split(' ')[1]
       jwt.verify(
         token,
         process.env.JWT_SECRET,
           { expiresIn: "24h" }, (error, decoded) => {
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
}


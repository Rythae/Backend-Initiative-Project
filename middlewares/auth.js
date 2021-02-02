const Model = require("../database/models");
const { User } = Model;
const ResponseHelper = require("../utility/ResponseHelper");

module.exports = {
  async (req, res, next) {
   const { username, email, password } = req.body
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
        const user = await User.findOne({ where: { email } })
        if (user) {
          return ResponseHelper.error(res, 409, {
            message: "User already exists",
            });
        }
        next()
    }
}
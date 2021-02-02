const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Model = require("../database/models");
const hashPassword = require("../utility/hash")
const util = require("../utility/util");
const ResponseHelper = require("../utility/ResponseHelper");
const { User } = Model

/**
 * @export
 */
class UsersController {
  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignup(req, res, next) {
    try {
      const { username, email, password } = req.body;
    
      const newUser = await User.create({
        username,
        email,
        password: hashPassword(password),
      });
      
      const token = util.setToken(newUser);

      const { id } = newUser;
      delete newUser.password;
      return ResponseHelper.success(res, 201, {
        token,
        newUser: { id, username, email },
      });

    } catch (error) {
      return next(new Error(error))
    }
  }
  
  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignin(req, res, next) {
    try {
        const { email, password } = req.body;
       
      const user = await User.findOne({ where: { email: email } })
        const isCorrectPassword =
          user && (await bcrypt.compareSync(password, user.password));
        if (!user) {
          ResponseHelper.error(res, 404, {
            message: "user not found",
          });
        } else if (!isCorrectPassword) {
          ResponseHelper.error(res, 401, {
            message: "Invalid username or password",
          });
        } else {
          const token = util.setToken(user);
          const data = {
            id: user.id,
            email: user.email,
            token,
          };
          console.log("token", token);
          ResponseHelper.success(res, 200, data);
        }
      }catch (error) {
        return next(new Error(error))
      }
    }
   

  static async getAll(req, res) {
    const users = await User.findAll();
    ResponseHelper.success(res, 200, {data: users});
  }
}

module.exports = UsersController;








const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Joi = require("@hapi/joi");
const Model = require("../database/models");
const hashPassword = require("../utility/hash")
const util = require("../utility/util");
const ResponseHelper = require("../utility/ResponseHelper");
const sendEmail = require("../utility/sendEmail")
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
      return next(new Error(error));
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

      const user = await User.findOne({ where: { email: email } });
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
    } catch (error) {
      return next(new Error(error));
    }
  }

  static async getAll(req, res) {
    const users = await User.findAll();
    ResponseHelper.success(res, 200, { data: users });
  }

  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {*} - returns void or next()
   */
  static async sendResetLink(req, res) {
    const schema = Joi.object({
      email: Joi.string().min(8).max(60).required().email(),
    });

    const { email } = req.body;
    try {
      await schema.validate(req.body);

      const user = await User.findOne({ where: { email } });
      if (!email) {
        return ResponseHelper.error(res, 400, {
          message: "invalid email",
        });
      }
      if (!user) {
        return ResponseHelper.error(res, 404, {
          message: "User not found",
        });
      }
      const token = util.setToken(user);
      const link = `${req.protocol}://${process.env.APP_URL}/reset_password/${token}`;
      await sendEmail(
        email,
        "noreply@movieapi.com",
        "Reset password",
        `<div>Click the link below to reset your password</div><br/>
        <div>${link}</div>
        `
      );
      return ResponseHelper.success(res, 200, {
        message: "Password reset link has been successfully sent to your inbox",
      });
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  }

  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {*} - returns void or next()
   */
  static async resetPassword(req, res) { 
    try {
      const { password } = req.body
      const token = req.params
      const decoded = util.verifyToken(token)
      const hash = hashPassword(password);
      const updatedUser = await User.update(
        { password: hash },
        {
          where: { id: decoded.userId },
          returning: true,
          plain: true,
        }
      );
      const { id, name, email } = updatedUser[1]
      ResponseHelper.success(res, 200, { id, name, email });
    } catch (error) {
      return ResponseHelper.error(res, 500, {
        message: "Server error",
      });
    }
  }
}

module.exports = UsersController;








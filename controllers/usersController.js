const users = require("../models/User");
const util = require("../utility/util");

const signUpController = async (req, res) => {
  try {
    const hashedPassword = await util.hash(req.body.password);
    const user = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(user);
    return util.successHandler(res, user);
  } catch (error) {
    return util.errorHandler(res, { message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const user = users.find((user) => user.email === req.body.email);
    if (user === null) {
      return util.errorHandler(res, { message: "User does not exist" }, 404);
    }
    if (await util.verifyPassword(req.body.password, user.password)) {
      const accessToken = util.setToken(user);
      const { name, email } = user;
      return util.successHandler(res, { name, email, accessToken });
    }
  } catch (error) {
    return util.errorHandler(res, { message: "User not allowed" }, 403);
  }
};

const getUsersController = (req, res) => {
  return util.successHandler(res, users);
};

module.exports = {
  signUpController,
  loginController,
  getUsersController,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const util = {};

util.successHandler = (res, data, status = 200) => {
  return res.status(status).json({ status, data });
};

util.errorHandler = (res, error, status = 500) => {
  return res.status(status).json({ status, error });
};

util.hash = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

util.verifyPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

util.setToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = util;

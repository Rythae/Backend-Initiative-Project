const bcrypt = require("bcryptjs");
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
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

util.verifyPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

util.setToken = ({ id, email }) => {
  return jwt.sign({ userId:  id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

util.verifyToken = (user) => {
  return jwt.verify(user, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = util;

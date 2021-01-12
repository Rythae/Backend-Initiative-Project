const express = require("express");
const router = express.Router();
const {
  signUpController,
  loginController,
  getUsersController
} = require("../controllers/usersController");


router.get("/", getUsersController);
router.post("/signup", signUpController)
router.post("/login", loginController);

module.exports = router;
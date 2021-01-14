const express = require("express");
const router = express.Router();
const UsersController  = require("../controllers/usersController");
const userSignupValidator = require("../middlewares/userSignupValidator")
const userSigninValidator = require("../middlewares/userSigninValidator")

router.get("/", UsersController.getAll);
router.post("/signup", userSignupValidator, UsersController.userSignup);
router.post("/login", userSigninValidator, UsersController.userSignin);

module.exports = router;

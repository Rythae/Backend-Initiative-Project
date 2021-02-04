const express = require("express")
const passport = require("passport")
const socialController = require("../controllers/social")

const router = express.Router();

router.get(
  "/auth/github",
  passport.authenticate("github", { session: false }, { scope: ["user:email"] })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false }),
  socialController
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  socialController
);

router.get("/logout", (req, res) => {
console.log('logout');
  req.session = null;
  req.logout();
  res.redirect("/");
}); 

module.exports = router;

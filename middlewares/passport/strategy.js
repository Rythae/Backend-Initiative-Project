const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const callback = require("./callback")
const dotenv = require("dotenv");

dotenv.config();
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


const passportGithubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  profileFields: ["id", "displayName", "name", "picture.type(large)"],
};

const passportGoogleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const passportJWTConfig = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const jwtHandler = (payload, done) => {
  done(null, payload);
};

const setPassportMiddleware = (server) => {
  server.use(passport.initialize());
  passport.use(new GitHubStrategy(passportGithubConfig, callback));
  passport.use(new GoogleStrategy(passportGoogleConfig, callback));
  passport.use(new JWTStrategy(passportJWTConfig, jwtHandler));
};

module.exports = setPassportMiddleware;

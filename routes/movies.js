const express = require("express");
const router = express.Router();
const tokenVerification = require("../middlewares/tokenVerification");
const movieSchemaValidator = require("../middlewares/movieSchemaValidator");
const MoviesController = require("../controllers/moviesController");
const VerifyOwner = require('../middlewares/verifyOwner')

router.get("/", tokenVerification, MoviesController.getAll);
router.get("/:id", tokenVerification, VerifyOwner.movie, MoviesController.getOne);
router.post(
  "/",
  tokenVerification,
  movieSchemaValidator,
  MoviesController.create
);
router.put(
  "/:id",
  tokenVerification,
  VerifyOwner.movie,
  MoviesController.update
);
router.delete(
  "/:id",
  tokenVerification,
  VerifyOwner.movie,
  MoviesController.delete
);

module.exports = router;

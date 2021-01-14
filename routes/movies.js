const express = require("express");
const router = express.Router();
const tokenVerification = require("../middlewares/tokenVerification");
const movieSchemaValidator = require("../middlewares/movieSchemaValidator");
const MoviesController = require("../controllers/moviesController");

router.get("/", tokenVerification, MoviesController.getAll);
router.get("/:id", tokenVerification, MoviesController.getOne);
router.post(
  "/",
  tokenVerification,
  movieSchemaValidator,
  MoviesController.create
);
router.put("/:id", tokenVerification, MoviesController.update);
router.delete("/:id", tokenVerification, MoviesController.delete);

module.exports = router;

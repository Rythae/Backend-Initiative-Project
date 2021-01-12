const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const {
  createMovieController,
  getMoviesController,
  getMovieByIdController,
  updateMovieByIdController,
  deleteMovieByIdController,
} = require("../controllers/moviesController");


router.get("/", verifyToken, getMoviesController);
router.get("/:id", verifyToken, getMovieByIdController);
router.post("/", verifyToken, createMovieController);
router.put("/:id", verifyToken, updateMovieByIdController);
router.delete("/:id", verifyToken, deleteMovieByIdController);

module.exports = router
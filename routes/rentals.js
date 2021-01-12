const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createRentalController,
  getRentalsController,
  getRentalByIdController,
  updateRentalByIdController,
  deleteRentalByIdController,
} = require("../controllers/rentalsController");

router.get("/", verifyToken, getRentalsController);
router.get("/:id", verifyToken, getRentalByIdController);
router.post("/", createRentalController);
router.put("/:id", verifyToken, updateRentalByIdController);
router.delete("/:id", verifyToken, deleteRentalByIdController);

module.exports = router;



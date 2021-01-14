const express = require("express");
const router = express.Router();
const tokenVerification = require("../middlewares/tokenVerification");
const rentalSchemaValidator = require("../middlewares/rentalSchemaValidator");
const RentalsController = require("../controllers/rentalsController");

router.get("/", tokenVerification, RentalsController.getAll);
router.get("/:id", tokenVerification, RentalsController.getOne);
router.post(
  "/",
  tokenVerification,
  rentalSchemaValidator, RentalsController.create
);
router.put("/:id", tokenVerification, RentalsController.update);
router.delete("/:id", tokenVerification, RentalsController.delete);

module.exports = router;



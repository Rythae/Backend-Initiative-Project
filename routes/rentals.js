const express = require("express");
const router = express.Router();
const tokenVerification = require("../middlewares/tokenVerification");
const rentalSchemaValidator = require("../middlewares/rentalSchemaValidator");
const RentalsController = require("../controllers/rentalsController");
const VerifyOwner = require("../middlewares/verifyOwner");

router.get("/", tokenVerification, RentalsController.getAll);
router.get("/:id", tokenVerification, VerifyOwner.rental, RentalsController.getOne);
router.post(
  "/",
  tokenVerification,
  rentalSchemaValidator, RentalsController.create
);
router.put(
  "/:id",
  tokenVerification,
  VerifyOwner.rental,
  RentalsController.update
);
router.delete(
  "/:id",
  tokenVerification,
  VerifyOwner.rental,
  RentalsController.delete
);

module.exports = router;



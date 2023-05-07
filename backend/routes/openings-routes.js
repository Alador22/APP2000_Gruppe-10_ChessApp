const express = require("express");
const { check } = require("express-validator");

const openingsController = require("../controllers/openings-controllers");

const router = express.Router();

//Route for å få alle åpninger etter creator ID
router.get("/:creatorId", openingsController.getOpenings);

//Route for å lage en ny åpning
router.post(
  "/save",
  [
    check("name").not().isEmpty(),
    check("moves").not().isEmpty(),
    check("description").not().isEmpty().isLength({ min: 10 }),
    check("creator_id").not().isEmpty(),
  ],
  openingsController.createOpening
);
//Route for å oppdatere en eksisterende åpning med navn
router.patch(
  "/:name",
  [
    check("name").not().isEmpty(),
    check("moves").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  openingsController.updateOpening
);
//Route for å slette en åpning
router.delete(
  "/delete",
  check("name").not().isEmpty(),
  openingsController.deleteOpening
);

module.exports = router;

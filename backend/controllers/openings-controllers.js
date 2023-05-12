const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Opening = require("../models/opening");

// Får alle åpninger av brukeren
const getOpenings = async (req, res, next) => {
  const creatorId = req.params.creatorId;
  let customOpenings;
  let defaultOpenings;
  try {
    defaultOpenings = await Opening.find({
      creator_id: "645d420a5095688bc839c600", //creatorID til Admin konto som er brukt for å lagre defaultOpenings
    });
    customOpenings = await Opening.find({ creator_id: creatorId });
  } catch (err) {
    const error = new HttpError(
      "Henting av åpninger mislyktes, Prøv igjen senere.",
      500
    );
    return next(error);
  }
  const response = {
    defaultOpenings: defaultOpenings.map((defaultOpenings) =>
      defaultOpenings.toObject()
    ),
    customOpenings: customOpenings.map((customOpenings) =>
      customOpenings.toObject()
    ),
  };
  res.json(response);
};

// Oppretter en ny åpning
const createOpening = async (req, res, next) => {
  const name = req.body.name;
  const moves = req.body.moves;
  const description = req.body.description;
  const creator_id = req.body.creator_id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Ugyldige inndata! vennligst prøv igjen.", 422));
  }
  // Sjekker om åpning allerede eksisterer
  let findingOpening;
  try {
    findingOpening = await Opening.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "kunne ikke opprette åpning, prøv igjen senere.",
      500
    );
    return next(error);
  }

  if (findingOpening) {
    const error = new HttpError(
      "Åpningen eksisterer allerede, prøv igjen med et annet navn.",
      422
    );
    return next(error);
  }

  // tilordne verdiene for den nye åpningen
  const createdOpening = new Opening({
    name,
    moves,
    description,
    creator_id,
  });
  //add authorization to make sure that users can only save openings on their accounts*
  try {
    await Opening.create(createdOpening);
  } catch (err) {
    const error = new HttpError(
      "kunne ikke opprette åpning, prøv igjen senere.",
      500
    );
    return next(error);
  }
  res.status(201).json({ opening: createdOpening.toObject({ getters: true }) });
};

// Oppdaterer en eksisterende åpning
const updateOpening = async (req, res, next) => {
  const name = req.params.name;
  const moves = req.body.moves;
  const description = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Ugyldige inndata, vennligst prøv igjen.", 422));
  }

  let opening;
  try {
    opening = await Opening.findOne({ name: name });
  } catch (err) {
    const error = new HttpError("noe gikk galt. Prøv igjen senere.", 500);
    return next(error);
  }

  if (!opening) {
    const error = new HttpError(
      "Kunne ikke finne åpningen for det angitte navnet.",
      404
    );
    return next(error);
  }

  opening.name = name;
  opening.moves = moves;
  opening.description = description;
  //add authorization to make sure that users can only update their openings*
  try {
    await Opening.create(opening);
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, kunne ikke oppdatere åpningen.",
      500
    );
    return next(error);
  }

  res.status(200).json({ opening: opening.toObject({ getters: true }) });
};

//sletting av en åpning
const deleteOpening = async (req, res, next) => {
  const name = req.body.name;

  let deleteOpening;
  try {
    deleteOpening = await Opening.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, kunne ikke slette åpningen.",
      500
    );
    return next(error);
  }

  if (!deleteOpening) {
    const error = new HttpError(
      "Kunne ikke finne åpningen for det angitte navnet.",
      404
    );
    return next(error);
  }
  //add authorization to make sure that users can only delete their openings*
  try {
    deleteOpening = await Opening.deleteOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Noe gikk galt, kunne ikke slette åpningen.",
      404
    );
    return next(error);
  }
  res.status(200).json("åpningen er slettet!");
};

exports.getOpenings = getOpenings;
exports.createOpening = createOpening;
exports.updateOpening = updateOpening;
exports.deleteOpening = deleteOpening;

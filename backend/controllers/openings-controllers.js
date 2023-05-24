const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Opening = require("../models/opening");

// Får alle åpninger av brukeren
const getOpenings = async (req, res, next) => {
  const creatorId = req.userData.userId;
  let customOpenings;
  let defaultOpenings;
  try {
    defaultOpenings = await Opening.find({
      creator_id: "64617a3fe26a437d1c0978e9", //creatorID til Admin konto som er brukt for å lagre defaultOpenings
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
  const creator_id = req.userData.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Ugyldige inndata! vennligst prøv igjen.", 422));
  }
  // Sjekker om åpning allerede eksisterer

  let findingOpening = await Opening.findOne().and([
    { name: name },
    { creator_id: creator_id },
  ]);

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
  const _id = req.params._id;
  const name = req.body.name;
  const moves = req.body.moves;
  const description = req.body.description;
  const creator_id = req.userData.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Ugyldige inndata, vennligst prøv igjen.", 422));
  }

  let opening = await Opening.findOne().and([
    { _id: _id },
    { creator_id: creator_id },
  ]);

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
  const _id = req.params._id;
  const creator_id = req.userData.userId;

  let deleteOpening = await Opening.findOne().and([
    { _id: _id },
    { creator_id: creator_id },
  ]);

  if (!deleteOpening) {
    const error = new HttpError(
      "Kunne ikke finne åpningen for det angitte navnet.",
      404
    );
    return next(error);
  }

  try {
    deleteOpening = await Opening.deleteOne({ _id });
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

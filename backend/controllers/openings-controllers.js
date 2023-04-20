const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Opening = require("../models/opening");

// Get all openings by creator
const getOpenings = async (req, res, next) => {
  const creatorId = req.params.creatorId;
  let openings;
  try {
    openings = await Opening.find({ creator_id: creatorId });
    //openings = await Opening.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching openings failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ openings: openings.map((opening) => opening.toObject()) });
};

// Create a new opening
const createOpening = async (req, res, next) => {
  const { name, moves, description, creator_id } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  // Check if opening exists
  let existingOpening;
  try {
    existingOpening = await Opening.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Creating opening failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingOpening) {
    const error = new HttpError(
      "Opening already exists, please try again with a different name.",
      422
    );
    return next(error);
  }

  // Create a new opening
  const createdOpening = new Opening({
    name,
    moves,
    description,
    creator_id,
  });

  try {
    await createdOpening.save();
  } catch (err) {
    const error = new HttpError(
      "Creating opening failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ opening: createdOpening.toObject({ getters: true }) });
};

// Update an existing opening by its _id
const updateOpening = async (req, res, next) => {
  const { name, moves, description } = req.body;
  const openingId = req.params.oid;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let opening;
  try {
    opening = await Opening.findById(openingId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update opening.",
      500
    );
    return next(error);
  }

  if (!opening) {
    const error = new HttpError(
      "Could not find opening for the provided id.",
      404
    );
    return next(error);
  }

  opening.name = name;
  opening.moves = moves;
  opening.description = description;

  try {
    await opening.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update opening.",
      500
    );
    return next(error);
  }

  res.status(200).json({ opening: opening.toObject({ getters: true }) });
};
exports.getOpenings = getOpenings;
exports.createOpening = createOpening;
exports.updateOpening = updateOpening;

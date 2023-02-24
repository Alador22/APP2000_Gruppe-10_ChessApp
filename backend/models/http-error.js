class HttpError extends Error {
  //denne klassen gjør det enklere å lage httpError feilmeldinger gjennom serveren
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}
module.exports = HttpError;

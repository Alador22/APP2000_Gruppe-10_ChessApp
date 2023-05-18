const rateLimit = require("express-rate-limit");

const userInteractionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 15 requests per minute
  message:
    "Too many requests sent from this IP, please try again after 1 minute",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const matchesLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
  message:
    "Too many requests sent from this IP, please try again after 1 minute",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.userInteractionLimiter = userInteractionLimiter;
exports.matchesLimiter = matchesLimiter;

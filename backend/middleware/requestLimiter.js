const rateLimit = require("express-rate-limit");

const userInteractionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 15 requests per minute
  message: "Too many requests sent from this IP, please try again after 2 mins",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const matchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 requests per minute
  message: "Too many requests sent from this IP, please try again after 2 mins",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.userInteractionLimiter = userInteractionLimiter;

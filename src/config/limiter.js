const RateLimit = require('express-rate-limit');

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

module.exports = {
  limiter,
};

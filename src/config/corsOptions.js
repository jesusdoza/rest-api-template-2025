const { logger } = require('./logger');

const whitelist = [
  'https://meuzishun.github.io/pigeon-ui',
  'https://meuzishun.github.io',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    logger.log({
      level: 'info',
      message: `Receiving request from origin: ${origin}...`,
    });
    if (!origin || whitelist.includes(origin)) {
      logger.log({
        level: 'info',
        message: `Origin ${origin} is whitelisted`,
      });
      callback(null, true);
    } else {
      logger.log({
        level: 'error',
        message: `Origin ${origin} is not allowed`,
      });
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
};

module.exports = {
  corsOptions,
};

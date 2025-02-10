const whitelist = [
  'https://meuzishun.github.io/pigeon-ui',
  'https://meuzishun.github.io',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
};

module.exports = {
  corsOptions,
};

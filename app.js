const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./config/corsOptions');
const compression = require('compression');
const helmet = require('helmet');
const { limiter } = require('./config/limiter');
const { router } = require('./routes/index');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.options('*', cors(corsOptions));
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.use(errorHandler);

module.exports = { app };

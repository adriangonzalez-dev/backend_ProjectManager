require('dotenv/config');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const {
  authRoutes, userRoutes, projectRoutes, taskRoutes, uploadRoutes,
} = require('./routes');
const { checkToken } = require('./middlewares');

const whiteList = [process.env.URL_FRONTEND];

const app = express();
dbConnection();

const configCors = {
  origin(origin, cb) {
    if (whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Error de cors'));
    }
  },
};
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/project', checkToken, projectRoutes);
app.use('/task', checkToken, taskRoutes);
app.use('/upload', checkToken, uploadRoutes);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: 'error' });
});

module.exports = app;

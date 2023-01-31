require('dotenv/config')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const {dbConnection} = require('./database/config')


const { authRoutes, userRoutes, projectRoutes, taskRoutes} = require('./routes');

const app = express();
dbConnection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:'error'});
});

module.exports = app;

const AppError = require('../utils/appError.js');

const sendErrorDev = (err, req, res) => {
  //1- API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    //2- RENDRED WEBSITE
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};

const sendErrorPro = (err, req, res) => {
  //1- API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //Programming or Unkown errors
    console.log('!!!!!!!', err);
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
  //2- RENDRED WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
      code: err.statusCode,
    });
  }
  //Programming or Unkown errors
  res.status(500).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later',
  });
  console.log('!!!!!!!', err);
};

const handleErrorCastDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateDB = (err) => {
  const message = `This ${Object.keys(err.keyValue)[0]} is already exist`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => {
  return new AppError(`Invalid token, please log in again`, 401);
};

const handleTokenExpiredError = () => {
  return new AppError(`Your token has expired, please log in again`, 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    //
    if (err.name === 'CastError') error = handleErrorCastDB(err);
    if (err.code === 11000) error = handleDuplicateDB(err);
    if (err.name === 'ValidationError') error = handleValidationDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredError();

    sendErrorPro(error, req, res);
  }
};

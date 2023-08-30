const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mealRouter = require('./routes/mealRouter');
const userRouter = require('./routes/userRouter');
const viewRouter = require('./routes/viewRouter');
const orderingRouter = require('./routes/orderingRouter');
const contactRouter = require('./routes/contactRouter');
const errorController = require('./controllers/errorController');
const orderController = require('./controllers/orderController');
const AppError = require('./utils/appError');
const app = express();
//For hosting that uses proxies
// app.enable('trust proxy');

//Set templates
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Global middlwares

//implement cors for simple & complex requests
app.use(cors());
app.options('*', cors());

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security http headers

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         'script-src': ["'self'", 'cdnjs.cloudflare.com'],
//         'style-src': ["'self'", 'fonts.googleapis.com'],
//       },
//     },
//   }),
// );

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  orderController.webhookCheckout,
);

//BODY parser
app.use(express.json({ limit: '10kb' }));
//BODY parser for html request
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//COOKIE parser
app.use(cookieParser());

//Prevent nosql injection attacks
app.use(mongoSanitize());

//prevent pramater pollution with hhp later...

//Compression data requests
app.use(compression());

//ROUTES
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/menu', mealRouter);
app.use('/api/v1/orders', orderingRouter);
app.use('/api/v1/contacts', contactRouter);

//Dealing with any route does not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Global error handler
app.use(errorController);

//Export app
module.exports = app;

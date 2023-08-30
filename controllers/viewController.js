const Meal = require('../models/mealModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Ordering = require('../models/orderingModel');
const Contact = require('../models/contactModel');
const User = require('../models/userModel');
const crypto = require('crypto');
const { json } = require('express');

exports.getIndex = catchAsync(async (req, res, next) => {
  const popularMeals = await Ordering.aggregate([
    {
      $match: {
        executed: true,
      },
    },
    {
      $unwind: '$meals',
    },
    {
      $lookup: {
        from: 'meals',
        localField: 'meals.meal',
        foreignField: '_id',
        as: 'mealInfo',
      },
    },
    {
      $unwind: '$mealInfo',
    },
    {
      $group: {
        _id: '$mealInfo._id',
        name: { $first: '$mealInfo.name' },
        price: { $first: '$mealInfo.price' },
        photos: { $first: '$mealInfo.photos' },
        description: { $first: '$mealInfo.description' },
        mealTotalQuantity: { $sum: '$mealInfo.quantity' },
      },
    },
    {
      $sort: { mealTotalQuantity: 1 },
    },
    {
      $limit: 3,
    },
  ]);

  res.status(200).render('index', {
    title: 'Online Restaurant',
    popularMeals,
  });
});

exports.getMenu = catchAsync(async (req, res, next) => {
  const mealsCategory = await Meal.aggregate([
    {
      $group: {
        _id: '$category',
        meals: { $push: '$$ROOT' },
      },
    },
  ]);

  res.status(200).render('menu', {
    title: 'The Menu',
    mealsCategory,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.status(301).redirect('/');
  }
  res.status(200).render('login', {
    title: 'Log in',
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.status(301).redirect('/');
  }
  res.status(200).render('forgotPassword', {
    title: 'Forgot your password?',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get user basen on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Token is invalid or has expired', 400));

  res.status(200).render('resetPassword', {
    title: 'Reset Your Password',
    resetToken: req.params.token,
  });
});

exports.profileAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).render('profileAdmin', {
    title: 'Profile',
    email: user.email || '',
    username: user.userName,
  });
});

//for pending and executed orders
exports.penExeAdmin = catchAsync(async (req, res, next) => {
  const isExecuted = req.path === '/admin/executed' ? true : false;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const length = (await Ordering.find({ executed: isExecuted })).length;

  const orders = await Ordering.find({ executed: isExecuted })
    .sort(isExecuted ? '-createdAt' : 'createdAt')
    .skip(skip)
    .limit(limit);

  res.status(200).render('pendingExecutedOrders', {
    title: isExecuted ? 'Executed Orders' : 'Pending Orders',
    length: length,
    range: Math.ceil(length / 10),
    isExecuted,
    orders,
  });
});

exports.getContacts = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const length = await Contact.count();

  const contacts = await Contact.find()
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  res.status(200).render('contacts', {
    title: 'Messages',
    length: length,
    range: Math.ceil(length / 10),
    contacts,
  });
});

exports.moderatorsManagement = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'moderator' });

  res.status(200).render('moderatorsManagement', {
    title: 'Moderators Management',
    length: users.length,
    users,
  });
});

exports.menuManagement = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const length = await Meal.count();
  const meals = await Meal.find().sort('category').skip(skip).limit(limit);

  res.status(200).render('menuManagement', {
    title: 'Menu Management',
    length,
    range: Math.ceil(length / 10),
    meals,
  });
});

exports.getStatistics = catchAsync(async (req, res, next) => {
  res.status(200).render('statistics', {
    title: 'statistics',
  });
});

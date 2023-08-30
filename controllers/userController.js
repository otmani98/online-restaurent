const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(201).json({
    status: 'success',
    length: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { userName, password, passwordConfirm } = req.body;

  if ((await User.count()) > 6)
    return next(new AppError('there are 5 users, you can not add more', 400));

  const user = await User.create({
    userName,
    password,
    passwordConfirm,
  });

  user.password = undefined;
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('There is no user with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('you can not change password from this route', 400),
    );
  if (req.body.role)
    return next(new AppError('You can not change the role', 401));

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!user) return next(new AppError('There is no user with this ID', 404));

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.user.id === req.params.id)
    return next(
      new AppError('this route is not for deleting your account', 404),
    );

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('There is no user with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//for current user
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('you can not change your password from this route', 400),
    );

  if (req.body.email === '') req.body.email = undefined;

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('There is no user with this id', 404));

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//for current user
exports.deleteMe = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin')
    return next(
      new AppError('as an admin you can not delete your account', 401),
    );

  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) return next(new AppError('There is no user with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

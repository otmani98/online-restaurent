const multer = require('multer');
const sharp = require('sharp');
const Meal = require('../models/mealModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Dealing with meal photos
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('This is not an image, please upload only images', 400));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadMealImages = upload.fields([{ name: 'photos', maxCount: 3 }]);

exports.resizeMealImages = catchAsync(async (req, res, next) => {
  if (!req.files.photos) return next();

  //photos
  req.body.photos = [];

  await Promise.all(
    req.files.photos.map(async (file, i) => {
      const fileName = `meal-${req.body.name
        .split(' ')
        .join('-')}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(800, 800)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/meals/${fileName}`);
      req.body.photos.push(fileName);
    }),
  );

  next();
});

exports.getMenu = catchAsync(async (req, res, next) => {
  //FILTERING
  //in JSON.parse(queryStr)
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  //SORTING
  //in req.query.sort
  //SELECT - DESELECT FIELDS
  //in req.query.fields
  //Paginate
  // in req.query.page + req.query.limit
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const menu = await Meal.find(JSON.parse(queryStr))
    .sort(req.query.sort)
    .select(req.query.fields)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: 'success',
    length: menu.length,
    data: {
      menu,
    },
  });
});

exports.getMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) return next(new AppError('There is no meal with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!meal) return next(new AppError('There is no meal with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      meal,
    },
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.findByIdAndDelete(req.params.id);

  if (!meal) return next(new AppError('There is no meal with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

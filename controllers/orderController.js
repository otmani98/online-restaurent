const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Meal = require('../models/mealModel');
const Order = require('../models/orderingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Ordering = require('../models/orderingModel');
const mongoose = require('mongoose');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  let line_items = [];

  for (const mealInfo of req.body.meals) {
    const meal = await Meal.findById(mealInfo.meal);

    const product = await stripe.products.create({
      name: `${meal.name}`,
      description: meal.description,
      images: [
        `https://www.wallpaperflare.com/static/999/929/140/pizza-baked-wooden-tray-wallpaper.jpg`,
      ],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: meal.price * 100,
      currency: 'usd',
    });

    line_items.push({ price: price.id, quantity: mealInfo.quantity });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    customer_email: req.body.email,
    success_url: `${req.protocol}://${req.get('host')}/?successPay`,
    cancel_url: `${req.protocol}://${req.get('host')}/?failPay`,
    metadata: {
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      suggestions: req.body.suggestions,
      meals: JSON.stringify(req.body.meals),
    },
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

const createOrderingCheckout = async (session) => {
  const { address, phoneNumber, suggestions } = session.metadata;
  const email = session.customer_email;
  const meals = JSON.parse(session.metadata.meals);
  const price = session.amount_total / 100;

  await Ordering.create({
    phoneNumber,
    address,
    email,
    price,
    suggestions,
    meals,
  });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Weebhood error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed')
    createOrderingCheckout(event.data.object);

  res.status(200).json({ recieved: true });
};

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Ordering.find(req.query).sort('createdAt');

  res.status(200).json({
    status: 'success',
    length: orders.length,
    data: {
      orders,
    },
  });
});

exports.orderToExecuted = catchAsync(async (req, res, next) => {
  const order = await Ordering.findById(req.params.id);

  order.executed = true;
  await order.save();

  //We can use sms here to tell clients that they order is executed (just idea)

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.createOreder = catchAsync(async (req, res, next) => {
  const order = await Ordering.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.getStatisticsMenu = catchAsync(async (req, res, next) => {
  const agg = await Ordering.aggregate([
    {
      $addFields: {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
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
        _id: {
          year: '$year',
          month: '$month',
          mealId: '$mealInfo._id',
        },
        mealName: { $first: '$mealInfo.name' },
        mealCategory: { $first: '$mealInfo.category' },
        mealPrice: { $first: '$mealInfo.price' },
        totalOrdered: { $sum: '$meals.quantity' },
        totalPrice: {
          $sum: { $multiply: ['$mealInfo.price', '$meals.quantity'] },
        },
      },
    },
    {
      $group: {
        _id: {
          year: '$_id.year',
          month: '$_id.month',
        },
        monthlyTotalPrice: { $sum: '$totalPrice' },
        meals: {
          $push: {
            mealId: '$_id.mealId',
            mealName: '$mealName',
            mealPrice: '$mealPrice',
            mealCategory: '$mealCategory',
            totalOrdered: '$totalOrdered',
            totalPrice: '$totalPrice',
          },
        },
      },
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    length: agg.length,
    data: agg,
  });
});

//for notifications
exports.getPendingOrdersLength = catchAsync(async (req, res, next) => {
  const length = await Ordering.find({ executed: false }).count();

  res.status(200).json({
    status: 'success',
    length,
  });
});

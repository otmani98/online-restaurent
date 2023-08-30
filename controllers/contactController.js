const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    length: contacts.length,
    data: {
      contacts,
    },
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);

  if (!contact) next(new AppError('there is no contact with this id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.contactId);

  if (!contact)
    return next(new AppError('There is no contact with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//for notifications
exports.getNotSeenMessgesLength = catchAsync(async (req, res, next) => {
  const length = await Contact.find({ seen: false }).count();

  res.status(200).json({
    status: 'success',
    length,
  });
});

//for making message as seen
exports.makeMessageSeen = catchAsync(async (req, res, next) => {
  await Contact.findByIdAndUpdate(req.params.contactId, {
    seen: true,
  });

  res.status(200).json({
    status: 'success',
  });
});

const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, contactController.getAllContacts)
  .post(contactController.createContact);

router
  .route('/lengthNotSeen')
  .get(authController.protect, contactController.getNotSeenMessgesLength);

router
  .route('/:contactId')
  .get(authController.protect, contactController.getContact)
  .delete(authController.protect, contactController.deleteContact)
  .patch(authController.protect, contactController.makeMessageSeen);

module.exports = router;

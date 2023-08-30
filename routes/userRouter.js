const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router
  .route('/me')
  .patch(authController.protect, userController.updateMe)
  .delete(authController.protect, userController.deleteMe);

router
  .route('/updateMyPassword')
  .patch(authController.protect, authController.updatePassword);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getUsers).post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

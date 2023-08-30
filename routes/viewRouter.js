const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getIndex);
router.get('/menu', authController.isLoggedIn, viewController.getMenu);
router.get('/login', authController.isLoggedIn, viewController.login);

router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewController.forgotPassword,
);
router.get('/resetPassword/:token', viewController.resetPassword);

router.get('/admin', authController.protect, viewController.profileAdmin);
router.get(
  '/admin/pending',
  authController.protect,
  viewController.penExeAdmin,
);
router.get(
  '/admin/executed',
  authController.protect,
  viewController.penExeAdmin,
);
router.get(
  '/admin/messages',
  authController.protect,
  viewController.getContacts,
);
router.get(
  '/admin/moderators',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.moderatorsManagement,
);
router.get(
  '/admin/menu',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.menuManagement,
);

router.get(
  '/admin/statis',
  authController.protect,
  viewController.getStatistics,
);

module.exports = router;

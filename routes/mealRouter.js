const express = require('express');
const mealController = require('../controllers/mealController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(mealController.getMenu)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    mealController.uploadMealImages,
    mealController.resizeMealImages,
    mealController.createMeal,
  );

router.get('/menuBsaedCategory', mealController.getMenuBasedOnCategory);

router
  .route('/:id')
  .get(mealController.getMeal)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    mealController.deleteMeal,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    mealController.uploadMealImages,
    mealController.resizeMealImages,
    mealController.updateMeal,
  );

module.exports = router;

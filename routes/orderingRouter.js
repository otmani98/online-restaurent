const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router = express.Router();

router.route('/checkout-session/').post(orderController.getCheckoutSession);

router.get('/popularMeals', orderController.getPopularMealsBasedOnOrders);

router.use(authController.protect);

router
  .route('/')
  .get(orderController.getOrders)
  .post(orderController.createOreder);

//Statistics about meals & quantities & totalprofits monthly sorted by newsest date
router.route('/statisticsMenu/').get(orderController.getStatisticsMenu);

router.route('/lengthPending').get(orderController.getPendingOrdersLength);

router.route('/:id').patch(orderController.orderToExecuted);

module.exports = router;

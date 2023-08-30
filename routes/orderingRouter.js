const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router = express.Router();

router.route('/checkout-session/').post(orderController.getCheckoutSession);

router.use(authController.protect);

router
  .route('/')
  .get(orderController.getOrders)
  .post(orderController.createOreder);

router.route('/:id').patch(orderController.orderToExecuted);

//Statistics about meals & quantities & totalprofite monthly sorted by newsest date
router.route('/statisticsMenu/').get(orderController.getStatisticsMenu);
router.route('/lengthPending').get(orderController.getPendingOrdersLength);
module.exports = router;

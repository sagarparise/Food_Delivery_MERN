const express = require('express');
const protected = require('../middlewares/protectedRoute');
const { placeOrder, verifyOrder, userOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.get('/getOrder', getOrders)
orderRouter.post('/placeOrder', protected, placeOrder );
orderRouter.post('/verifyOrder', protected, verifyOrder);
orderRouter.get('/userOrder', protected, userOrders);
orderRouter.put('/orderUpdate',updateOrderStatus);



module.exports = orderRouter;
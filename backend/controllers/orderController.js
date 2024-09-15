const Stripe = require('stripe');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const { response } = require('express');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontendUrl = 'http://localhost:5173'
  const currentUser = req.user;
  const { items, amount, address } = req.body;

  try {
    // Create a new order
    const newOrder = new Order({
      userId: currentUser._id,
      items,
      amount,
      address
    });
    await newOrder.save();

    // Clear the user's cart
    // await Cart.findOneAndUpdate(
    //   { user: currentUser._id },
    //   { $set: { items: [] } },
    //   { new: true }
    // );
    // Prepare line items for Stripe payment
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.food.name,
        },
        unit_amount: item.food.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery fee
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Delivery Fee',
        },
        unit_amount: 300, // $3 delivery fee in cents
      },
      quantity: 1,
    });

    const successUrl = `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`;
    const cancelUrl = `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`;

    // Log URLs for debugging
   

const session = await stripe.checkout.sessions.create({
  line_items: line_items,
  mode: 'payment',
  success_url: successUrl,
  cancel_url: cancelUrl,
})  
console.log(session.url)

    res.status(201).json({
      success: true,
      session_url:session.url,
      message: 'Order placed successfully',
    
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
};

const verifyOrder = async(req, res) => {
  const { orderId, success } = req.body;
  const currentUser = req.user;
  console.log('Verify Success', success);
 

  try {
    if(success === 'true'){
      // Update order status
      console.log('verify true')
      await Order.findByIdAndUpdate(orderId, { payment: true });
        await Cart.findOneAndUpdate(
      { user: currentUser._id },
      { $set: { items: [] } },
      { new: true }
    );
      res.json({
        success: true,
        message: 'payment successfully'
      })
    }else{
      console.log('verify false')
      await Order.findByIdAndDelete(orderId)
      res.json({success: false, message:'failed to payment'})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
    
  }

};

const userOrders = async (req, res) => {
  const currentUser = req.user;
  try {
    const orders = await Order.find({ userId: currentUser._id });
    res.status(200).json({
      status: 200,
      message: 'Orders fetched successfully',
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
   
    });
  }
};

const getOrders = async (req, res) => {
  console.log('get orders')
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: 200,
      message: 'Orders fetched successfully',
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
  
}

// update order status 

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  console.log(req.body);

  // print orderId and Status
  console.log('Order ID:', orderId);
  console.log('Status:', status);


  try {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
    res.status(200).json({
      status: 200,
      message: 'Order status updated successfully',
    updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  getOrders,
  updateOrderStatus,
 
};

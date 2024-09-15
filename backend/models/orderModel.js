
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 userId: {
  type: String,
  required: true
 },
 items:{
  type: Array,
  required: true
 },
 amount:{
  type: Number,
  required: true
 },
 status:{
  type: String,
  default: 'Food Processing'
 },
 date:{
  type: Date,
  default: Date.now()
 },
 address:{
  type: Object,
  required: true
 },
 payment:{
  type: Boolean,
  default: false
 }

})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;
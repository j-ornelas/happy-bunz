const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = Schema({
  name: String,
  address: String,
  phone: String,
  city: String,
  zip: String,
  donuts: Object,
  price: Number,
  quantity: Number,
  pickupDate: String,
});

const Order = model('Order', orderSchema);

module.exports = Order;

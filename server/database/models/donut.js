const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const donutSchema = Schema({
  name: String,
  price: String,
});

const Donut = model('Donut', donutSchema);

module.exports = Donut;

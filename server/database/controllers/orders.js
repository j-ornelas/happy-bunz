const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const Order = require('../models/order');

const { Router } = express;
const router = Router();
router.use(bodyParser.json());

// GET orders from a single day.
router.post('/date', async (req, res) => {
  const { pickupDate } = req.body;
  if (!pickupDate) return res.json({ message: 'Did not submit a date' });

  return Order.find({
    pickupDate: new Date(pickupDate).toLocaleDateString()
  })
    .then(info => {
      console.log('info', info)
      res.json(info);
    })
    .catch(err => {
      res.json({ message: `Something went wrong fetching orders for this day. More info: ${err.toString()}` });
    });
});

router.post('/create', async (req, res) => {
  // TODO: add auth, throw error if missing info.
  const {
    pickupDate,
    name,
    address,
    phone,
    city,
    zip,
    donuts,
    price,
    quantity,
  } = req.body;

  const newOrder = {
    pickupDate: new Date(pickupDate).toLocaleDateString(),
    name,
    address,
    phone,
    city,
    zip,
    donuts,
    price,
    quantity,
  };

  Order.create(newOrder)
    .then(dbres => {
      if (dbres._id) {
        res.json({ success: true });
      } else {
        res.json({ message: 'Could not save order. Try again later.' });
      }
    })
    .catch(err => res.send({ message: `Couldn't save order. Try again later. Error info: ${err.toString()}` }));
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const Order = require('../models/order');

const { Router } = express;
const router = Router();
router.use(bodyParser.json());

// GET orders from a single day.
router.post('/date', async (req, res) => {
  const { pickupDate } = req.body;
  if (!pickupDate) return res.json({ message: 'Did not submit a date' });

  return Order.find({ pickupDate })
    .then(info => res.json(info))
    .catch(err => res.json({ message: `Something went wrong fetching orders for this day. More info: ${err.toString()}` }));
});

// DELETE order from DB
router.delete('/id', async (req, res) => {
  const { _id } = req.body;
  if (!_id) return res.json({ message: 'Did not send the server enough info. Contact admin if problem continues.' });
  return Order.deleteOne({ _id })
    .then(dbRes => {
      if (dbRes.deletedCount) return res.json({ success: true });
      throw new Error('Did not successfully delete item from DB. if issue persists, contact admin');
    })
    .catch(err => res.json({ message: `Something went wrong deleting your order. More info: ${err.toString()}` }));
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

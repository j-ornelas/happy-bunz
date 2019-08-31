const express = require('express');
const bodyParser = require('body-parser');
const Donut = require('../models/donut');

const { Router } = express;
const router = Router();
router.use(bodyParser.json());

router.get('/all', async (req, res) => {
  const donuts = await Donut.find();
  res.send(donuts);
});

router.post('/create', async (req, res) => {
  const { name, price } = req.body;
  Donut.create({ name, price })
    .then(dbres => {
      res.json({ name: dbres.name, price: dbres.price, success: true });
    })
    .catch(err => res.send({ message: `Couldn't save donut. Try again later. Error info: ${err.toString()}` }));
});

router.delete('/delete', async (req, res) => {
  const { _id } = req.body;
  Donut.deleteOne({ _id })
    .then((dbres) => {
      console.log('dbres', dbres);
    });
});


module.exports = router;

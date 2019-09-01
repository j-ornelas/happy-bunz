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
  // TODO: add auth, throw error if missing info.
  const { name, price } = req.body;
  Donut.create({ name, price })
    .then(dbres => {
      res.json({ name: dbres.name, price: dbres.price, success: true });
    })
    .catch(err => res.send({ message: `Couldn't save donut. Try again later. Error info: ${err.toString()}` }));
});

router.delete('/delete', async (req, res) => {
  // TODO: add auth, throw error if missing info.
  const { _id } = req.body;
  Donut.deleteOne({ _id })
    .then((dbres) => {
      if (dbres.deletedCount) {
        res.json({ success: true });
      } else {
        res.json({ message: 'Donut not deleted. Try again another time.' });
      }
    })
    .catch(err => res.send({ message: `Donut not deleted. Error info: ${err.toString()}` }));
});


module.exports = router;

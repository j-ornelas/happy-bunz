require('dotenv').config();
require('./database/');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
/* ******** SERVER CONFIG ******** */
const app = express();
const port = process.env.PORT || 3003;
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// /* ******** CONTROLLERS ******** */
const DonutController = require('./database/controllers/donuts');
const OrderController = require('./database/controllers/orders');
/* **** JWT PROTECTED ROUTES **** */
app.use('/donuts', DonutController);
app.use('/orders', OrderController);
// /* ******* PUBLIC ROUTES ******* */
// app.use('/auth', AuthController);
// app.use('/reset', ResetPWController);
/* ******** SERVER INIT ******** */
app.get('/', (req, res) => res.send('Happy Bunz server is live!!!')); // visual live-check
app.get('/api/test', (req, res) => {
  res.send({ test: 'hello' });
});
app.listen(port, () => console.log(`ToProovIt server listening on port ${port}!`));

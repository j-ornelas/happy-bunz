require('dotenv').config();
require('./database/');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
/* ******** SERVER CONFIG ******** */
const app = express();
const port = process.env.PORT || 3003;
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
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
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));
app.listen(port, () => console.log(`ToProovIt server listening on port ${port}!`));

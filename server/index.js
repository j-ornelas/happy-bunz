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
// const AuthController = require('./database/controllers/auth');
// const ResetPWController = require('./database/controllers/resetPassword');
// const CaseController = require('./database/controllers/case');
// const EntryController = require('./database/controllers/entry');
/* **** JWT PROTECTED ROUTES **** */
app.use('/donuts', DonutController);
// app.use('/case', CaseController);
// app.use('/entry', EntryController);
// /* ******* PUBLIC ROUTES ******* */
// app.use('/auth', AuthController);
// app.use('/reset', ResetPWController);
/* ******** SERVER INIT ******** */
app.get('/', (req, res) => res.send('Happy Bunz server is live!!!')); // visual live-check
app.get('/api/test', (req, res) => {
  res.send({ test: 'hello' });
});
app.listen(port, () => console.log(`ToProovIt server listening on port ${port}!`));

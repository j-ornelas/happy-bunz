const mongoose = require('mongoose');

const dbName = 'happybunz';

mongoose.connect(`mongodb://localhost/${dbName}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to database: ', dbName);
});

module.exports = db;

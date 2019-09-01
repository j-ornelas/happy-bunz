const mongoose = require('mongoose');


const { ATLAS_USER, ATLAS_PASSWORD } = process.env;

mongoose.connect(`mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@happybunzprod-es6el.mongodb.net/test?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to database user: ', ATLAS_USER));

module.exports = db;

var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost/poetry';

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);

var db = mongoose.connection;

db.on('connected', function() {
  console.log('connected successful!');
});

db.on('error', function(err) {
  if(err) console.log(err);
  console.log('connected ERROR: ' + err);
});

db.on('disconnected', function() {
  console.log('disconencted from server');
});

module.exports = mongoose;

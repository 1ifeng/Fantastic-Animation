var mongoose = require('../lib/mongoose');

var PoetrySchema = mongoose.Schema({
  userid: Number,
  username: String,
  firstline: String,
  secondline: String,
  thirdline: String,
  createtime: {type : Date, default: Date.now}
}, {
  versionKey: false
});

var Poetry = mongoose.model('poetry', PoetrySchema);

module.exports = Poetry;

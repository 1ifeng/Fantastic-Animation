var express = require('express');
var router = express.Router();
var Poetry = require('../model/poetry');

router.get('/release', function(req, res) {
  res.render('release', {title: '发布新'});
});

router.post('/release', function(req, res) {
  var _p = {
    userid: 2,
    username: 'Jason',
    firstline: req.body.firstline,
    secondline: req.body.secondline,
    thirdline: req.body.thirdline
  };

  var poetry = new Poetry(_p);
  poetry.save(function(err) {
    if (err) console.log(err);
    console.log('saved!!!!');
    res.redirect('index');
  });

});

module.exports = router;

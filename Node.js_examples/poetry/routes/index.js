var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Poetry' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Poetry' });
});

module.exports = router;

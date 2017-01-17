var express = require('express');
var router = express.Router();

/* GET home page. */
exports.index = function(req, res, next) {
  res.render('index', { title: '首页' });
};

exports.reg = function(req, res, next) {
  res.render('reg', {title: '用户注册'});
};

// exports.doReg = function(req, res, next) {

// };

// exports.login = function(req, res, next) {

// };

// exports.doLogin = function(req, res, next) {

// };

// exports.logout = function(req, res, next) {

// };

// exports.post = function(req, res, next) {

// };


var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('', function(req, res, next) {
  superagent.get('http://cnodejs.org/')
    .end(function(err, sres) {
      if (err) {
        console.log(err);
      }

      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .cell').each(function(idx, element) {
        var $element = $(element);
        items.push({
          title: $element.find('.topic_title').attr('title'),
          href: $element.find('.topic_title').attr('href'),
          author: $element.find('.user_avatar img').attr('title')
        });
      });

      res.send(items);
    });
});

app.listen('8080', function() {
  console.log('app is listening on port: 8080');
});
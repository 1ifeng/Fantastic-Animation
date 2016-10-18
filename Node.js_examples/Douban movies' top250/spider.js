var express = require('express'),
    fs = require('fs'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    pages = [75, 25, 0];
    // url = 'https://movie.douban.com/top250?start=' + i + '&filter=';

// for (var i in pages) {
  // var url = 'https://movie.douban.com/top250?start=' + pages[i];
//   console.log(pages[i]);
//   douban(pages[i]);
// }



function douban(num) {
  superagent
    .get('https://movie.douban.com/top250?start=' + num)
    .end(function(err, sres) {
    if(err) console.log(err);

    console.log('\nConnecting ok\n=========================================\n');
    var $ = cheerio.load(sres.text);
    var top250 = [];
    $('.grid_view .item').each(function(index,data){
      var movies = {
        id: $(this).find('.pic > em').text(),
        title: $(this).find('.title').text(),
        imgUrl: $(this).find('.pic img').attr('src'),
        type: $(this).find('.bd p:not(".quote")').text(),
        url: $(this).find('.title').parent().attr('href'),
        star: $(this).find('.star > .rating_num').text(),
        descriptions: $(this).find('.inq').text()
      };

      top250.push(movies);
    });
    // console.log(top250);

    var str = JSON.stringify(top250, null, ' ');

    fs.writeFile('temp.json', str, 'utf8', function(err) {
      if (err) console.log(err);
      console.log('write successful');
    });
  });
}
douban(0);


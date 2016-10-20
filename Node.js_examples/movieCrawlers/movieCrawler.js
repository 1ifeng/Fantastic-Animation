var fs = require('fs'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    movies = [],
    urls = [];

for (var i = 0; i <=225; i += 25) {
  urls.push('https://movie.douban.com/top250?start=' + i);
}

urls.forEach(function(url) {
  // console.log(url);
  superagent.get(url).end(function(err, sres) {
    if (err) console.log(err);
    console.log('Connecting OK!');

    var $ = cheerio.load(sres.text);
    $('.grid_view .item').each(function() {
      var temp = {
        id: $(this).find('.pic > em').text(),
        title: $(this).find('.title').text(),
        imgUrl: $(this).find('.pic img').attr('src'),
        abstract: $(this).find('.bd p:not(".quote")').text(),
        url: $(this).find('.title').parent().attr('href'),
        star: $(this).find('.star > .rating_num').text(),
        descriptions: $(this).find('.inq').text()
      };

      movies.push(temp);
    });
    console.log(movies);

    movies.sort(sortBy('id', false, parseInt));
    var movieString = JSON.stringify(movies, null, ' ');
    console.log(movieString);
    fs.writeFileSync('movies.json', movieString, 'utf8');
    console.log('Write successful!');
  });
});


function sortBy(filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
        a = a[filed];
        b = b[filed];
        if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
        }
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    };
}



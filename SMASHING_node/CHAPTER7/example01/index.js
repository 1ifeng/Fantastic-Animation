var http = require('http');
var qs = require('querystring');

http.createServer(function(req, res) {
  if ('/' == req.url) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end([
      '<form action="/url" method="post">',
        '<h1>My Form</h1>',
        '<fieldset>',
          '<label for="">Name:</label>',
            '<input type="text" name="name">',
          '<input type="button" value="submit">',
        '</fieldset>',
      '</form>'
    ].join(' '));
  } else if ('/url' == req.url && 'POST' == req.method) {
    var body = '';
    // res.writeHead(200, {'Content-Type': 'text/text/html'});
    // res.end('you sent a ' + req.method + ' method');
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('Your name is <b>' + qs.parse(body).name + ' </b></p>');
    });
  } else {
    res.writeHead(404);
    res.end('not Found');
  }
}).listen(8989, function(err) {
  if (err) console.log(err);
  console.log('Server is listening on port: 8989');
});

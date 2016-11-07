var net = require('net');
var count = 0,
    users = {};
var server = net.createServer(function(conn) {
  // console.log('NEW CONNECTION!');
  conn.setEncoding('utf8');
  var nickname;
  conn.write(
    '\n > welcome to node-chat' +
    '\n > ' + count + ' other people are connected at this time' +
    '\n > please write your name and press enter: '
  );
  count++;

  conn.on('data', function(data) {
    data = data.replace('\r\n', '');
    if (!nickname) {
      if (users[data]) {
        conn.write('\n > nickname is already in use. try again: ');
      } else {
        nickname = data;
        users[nickname] = conn;

        for (var i in users) {
          users[i].write('\n > ' + nickname + ' joined the room');
        }
      }
    } else {
      for (var j in users) {
        if (j != nickname) {
          users[j].write('\n > ' + nickname + ': ' + data);
        }
      }
    }
  });

  conn.on('close', function() {
    count--;
  });
});

server.listen(3000, function() {
  console.log('server listening on port 3000');
});

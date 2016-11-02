var fs = require('fs'),
    colors = require('colors'),
    stdin = process.stdin,
    stdout = process.stdout,
    path = process.cwd();

fs.readdir(path, function(err, files) {
  if (err) console.log(err);
  console.log('');
  for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    console.log(' ' + i + '. ' + filename);
  }

  stdout.write('\nChoose which file or directory you want to see: '.magenta);
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', option);

  function option(data) {
    data = Number(data.replace(/\s+/g, ''));

    fs.stat(path + '/' + files[data], function(err, stats) {
      if (err) console.log(err);

      if (stats.isDirectory()) {
        console.log('This is a directory'.green);
        fs.readdir(path + '/' + files[data], function(err, file) {
          if (err) console.log(err);
          console.log(' (' + file.length + ' files)');
          for(var i = 0;i < file.length; i++) {
            console.log('  ' + i + '. ' + file[i]);
          }
        });
      } else {
        fs.readFile(path + '/' + files[data], 'utf8', function(err, data) {
          if (err) console.log(err);
          console.log('');
          console.log(data.gray);
        });
      }
    });
  }
});

var fs = require("fs"),
  stdout = process.stdout,
  stdin = process.stdin;
fs.readdir(process.cwd(), function (err, files) {
  if (files.length < 1) {
    return console.log("No files to show");
  }
  console.log("Select which file ou directory you want to see");
  console.log("file.length", files.length);
  stats = [];

  function file(i) {
    var filename = files[i];
    fs.stat(__dirname + "/" + filename, function (err, Stats) {
      stats[i] = Stats;
      console.log("   " + i + "   " + filename + "   ");
      if (++i == files.length) {
        read();
      } else {
        file(i);
      }
    });

    function read() {
      stdout.write("enter you chioce:");
      stdin.resume();
      stdin.setEncoding("utf-8");
      stdin.on("data", option);
    }

    function option(data) {
      var filename = files[Number(data)];
      if (!filename) {
        stdout.write("enter you chioce");
      } else {
        stdin.pause();
        console.log(data);
        if (stats[Number(data)].isDirectory()) {
          fs.readdir(__dirname + "/" + filename, function (err, files) {
            console.log('  (' + files.length + ' files)');
            files.forEach(function (file, index) {
              console.log(index + "-----" + file);
            });
          });
        } else {
          fs.readFile(__dirname + "/" + filename, "utf-8", function (err,
            data) {
            console.log(data.replace(/(.*)/g, "      $1") + "   ");
          });
        }
      }
    }
  }
  file(0);
});

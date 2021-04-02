// var http = require("http");
// var url = require("url"); // for working with the url of the node server webpage

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     var q = url.parse(req.url, true).query;
//     var dates = q.year;
//     res.end(dates);
//   })
//   .listen(8080);

var http = require("http");
var fs = require("fs"); // for working with files
var url = require("url");
const port = process.env.PORT || 5000;

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (filename == "./") {
      filename = "./index";
    }

    filename = filename + ".html";

    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 not fonund");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      console.log("... Incoming Request: " + req.url); // how to create server console status messages
      return res.end();
    });
  })
  .listen(port);

console.log("Server listening");

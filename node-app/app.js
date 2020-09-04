var express = require('express');
var app = express();
var formidable = require("formidable");
fs = require("fs");

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/public', express.static('public'));

app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    console.log("parsing start!");
    form.parse(req, function(error, fields, files) {
        fs.writeFileSync("public/models/"+files.upload.name, fs.readFileSync(files.upload.path));
        console.log(files.upload.name + " was parsed done!");
        res.redirect("/public/index.html") ;
    });
});

// var server = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//
//     console.log('Example app listening at http://%s:%s', host, port);
// });

// for HTTPS
var https = require('https'), fs = require('fs');

var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
});

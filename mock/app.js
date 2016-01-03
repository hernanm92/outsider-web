var express = require('express'),
fs = require('fs'),
morgan  = require('morgan'),
bodyParser = require('body-parser')
request = require('request');

var app = express();

var accessLogStream = fs.createWriteStream('mock.log', {flags: 'w'});
app.use(morgan('common', {stream: accessLogStream}));

app.use(bodyParser.json())
var applications = [
    {url: 'img/gallery/img1.jpg', label: 'skate1', filter: 'skate'},
    {url: 'img/gallery/img2.jpg', label: 'longboard2', filter: 'longboard'},
    {url: 'img/gallery/img1.jpg', label: 'skate3', filter: 'skate'},
    {url: 'img/gallery/img2.jpg', label: 'longboard4', filter: 'longboard'},
    {url: 'img/gallery/img1.jpg', label: 'skate5', filter: 'skate'},
    {url: 'img/gallery/img2.jpg', label: 'longboard6', filter: 'longboard'}
];


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE');
  next();
});

//Applications
app.get('/photos', function(req, res) {
  res.status(200);
  res.send(applications);
});

var server = app.listen(5000, function() {
  console.log("Api started in port: 5000");
});

var express = require('express'),
fs = require('fs'),
morgan  = require('morgan'),
bodyParser = require('body-parser');
request = require('request');

var app = express();

var accessLogStream = fs.createWriteStream('mock.log', {flags: 'w'});
app.use(morgan('common', {stream: accessLogStream}));

app.use(bodyParser.json());
var photos = [
    {url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate'},
    {url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard'},
    {url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate'},
    {url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard'},
    {url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate'},
    {url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard'}
];

var riders = [
    {photo_url: 'img/teams/img1.png', sport: 'longboard', name: 'Damián Nehemias'},
    {photo_url: 'img/teams/img2.png', sport: 'longboard', name: 'Sebastián Muñoz'},
    {photo_url: 'img/teams/img3.png', sport: 'longboard', name: 'Thomas Duarte'},
    {photo_url: 'img/teams/img4.png', sport: 'longboard', name: 'Valentín Travis Spalla'}
 ];

var posts = [
    {url: 'img/blog/img1.jpg', label: 'skate1', type: 'image'},
    {url: 'img/blog/img2.jpg', label: 'longboard2', type: 'image'},
    {url: 'img/blog/img3.jpg', label: 'skate3', type: 'image'},
    {url: '//player.vimeo.com/video/113463529?title=0&byline=0&portrait=0', label: 'surf3', type: 'video'},
    {url: 'img/blog/img2.jpg', label: 'longboard4', type: 'image'},
    {url: 'img/blog/img1.jpg', label: 'skate5', type: 'image'}
];

var user = {username: "admin"};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE');
  next();
});

//Photos
app.get('/photos', function(req, res) {
  res.status(200);
  res.send(photos);
});

//Riders
app.get('/riders', function(req, res) {
    res.status(200);
    res.send(riders);
});

//Posts
app.get('/posts', function(req, res) {
    res.status(200);
    res.send(posts);
});

//Login
app.post('/admin/login', function(req, res) {
    res.status(200);
    res.send(user);
});

//Post
app.post('/admin/post', function(req, res) {
    res.status(200);
    res.send(user);
});

//Team member
app.post('/admin/teamMember', function(req, res) {
    res.status(200);
    res.send(user);
});

//Spot
app.post('/admin/spot', function(req, res) {
    res.status(200);
    res.send(user);
});

var server = app.listen(5000, function() {
  console.log("Api started in port: 5000");
});

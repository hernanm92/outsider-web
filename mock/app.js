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
    {id: 1, url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate'},
    {id: 2, url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard'},
    {id: 3, url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate'},
    {id: 4, url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard'},
    {id: 5, url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate'},
    {id: 6, url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard'}
];

var riders = [
    {id: 1, photo_url: 'img/teams/img1.png', sport: 'longboard', name: 'Damián Nehemias', alias: 'dnehemias'},
    {id: 2, photo_url: 'img/teams/img2.png', sport: 'longboard', name: 'Sebastián Muñoz', alias: 'smunoz'},
    {id: 3, photo_url: 'img/teams/img3.png', sport: 'longboard', name: 'Thomas Duarte', alias: 'tduarte'},
    {id: 4, photo_url: 'img/teams/img4.png', sport: 'longboard', name: 'Valentín Travis Spalla', alias: 'vspalla'}
 ];

var posts = [
    {id: 1, url: 'img/blog/img1.jpg', title: 'skate1', type: 'image', sport: 'skate'},
    {id: 2, url: 'img/blog/img2.jpg', title: 'longboard2', type: 'image', sport: 'longboard'},
    {id: 3, url: 'img/blog/img3.jpg', title: 'skate3', type: 'image', sport: 'skate'},
    {id: 4, url: '//player.vimeo.com/video/113463529?title=0&byline=0&portrait=0', title: 'surf3', type: 'video', sport: 'surf'},
    {id: 5, url: 'img/blog/img2.jpg', title: 'longboard4', type: 'image', sport: 'longboard'},
    {id: 6, url: 'img/blog/img1.jpg', title: 'skate5', type: 'image', sport: 'skate'}
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

app.get('/photos/:id', function(req, res) {
    res.status(200);
    res.send(photos[0]);
});

//Riders
app.get('/riders', function(req, res) {
    res.status(200);
    res.send(riders);
});

app.get('/riders/:id', function(req, res) {
    res.status(200);
    res.send(riders[0]);
});

//Posts
app.get('/posts', function(req, res) {
    res.status(200);
    res.send(posts);
});

app.get('/posts/:id', function(req, res) {
    res.status(200);
    res.send(posts[0]);
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

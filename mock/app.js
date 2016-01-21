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
    {id: 1, url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 2, url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 3, url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 4, url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 5, url: 'img/gallery/img1.jpg', title: 'Facultad de medicina', sport: 'skate', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 6, url: 'img/gallery/img2.jpg', title: 'Bajando el libano', sport: 'longboard', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."}
];

var riders = [
    {id: 1, photo_url: 'img/teams/img1.png', sport: 'longboard', name: 'Damián Nehemias', alias: 'dnehemias', procedence: "Berazategui, Buenos Aires, Argentina 1", residence: "Berazategui, Buenos Aires, Argentina", stance: "Bueno", spot: "Libano", birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco."},
    {id: 2, photo_url: 'img/teams/img2.png', sport: 'longboard', name: 'Sebastián Muñoz', alias: 'smunoz', procedence: "Bella Vista, Buenos Aires, Argentina 1", residence: "Bella Vista, Buenos Aires, Argentina", stance: "Bueno", spot: "Libano", birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco."},
    {id: 3, photo_url: 'img/teams/img3.png', sport: 'longboard', name: 'Thomas Duarte', alias: 'tduarte', procedence: "Tortuguitas, Buenos Aires, Argentina 1", residence: "Tortuguitas, Buenos Aires, Argentina", stance: "Bueno", spot: "Libano", birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco."},
    {id: 4, photo_url: 'img/teams/img4.png', sport: 'longboard', name: 'Valentín Travis Spalla', alias: 'vspalla', procedence: "San Miguel, Buenos Aires, Argentina 1", residence: "San Miguel, Buenos Aires, Argentina", stance: "Bueno", spot: "Libano", birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco."}
 ];

var spots = [
    {id: 1, url: 'img/spots/libano.jpg', sports: ['longboard'], name: 'Líbano', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {id: 2, url: 'img/spots/pared.jpg', sports: ['longboard'], name: 'La Pared', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {id: 3, url: 'img/spots/pacha.jpg', sports: ['longboard', 'skate'], name: 'Pachá Skate Park', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {id: 4, url: 'img/spots/garrahan.jpg', sports: ['BMX', 'skate'], name: 'Garrahan', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."}
 ];

var posts = [
    {id: 1, url: 'img/blog/img1.jpg', title: 'Nuevo skatepark en plaza Houssay', type: 'image', sport: 'skate', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 2, url: 'img/blog/img2.jpg', title: 'Evento en el Libano', type: 'image', sport: 'longboard', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 3, url: 'img/blog/img3.jpg', title: 'Aaron Rios se suma al team de Outsider', type: 'image', sport: 'skate', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 4, url: '//player.vimeo.com/video/113463529?title=0&byline=0&portrait=0', title: 'Arte con tablas por Matt Gahan', type: 'video', sport: 'surf', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 5, url: 'img/blog/img2.jpg', title: 'Evento en el Libano', type: 'image', sport: 'longboard', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 6, url: 'img/blog/img1.jpg', title: 'Nuevo skatepark en plaza Houssay', type: 'image', sport: 'skate', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."}
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

//Spots
app.get('/spots', function(req, res) {
    res.status(200);
    res.send(spots);
});

app.get('/spots/:id', function(req, res) {
    res.status(200);
    res.send(spots[0]);
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

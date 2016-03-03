var express = require('express'),
fs = require('fs'),
morgan  = require('morgan'),
bodyParser = require('body-parser');
request = require('request');

var app = express();

var accessLogStream = fs.createWriteStream('mock.log', {flags: 'w'});
app.use(morgan('common', {stream: accessLogStream}));

app.use(bodyParser.json());
var spots = [
    {id: 1, url: 'img/spots/libano.jpg', sports: ['Longboard'], name: 'Líbano', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {id: 2, url: 'img/spots/pared.jpg', sports: ['Longboard'], name: 'La Pared', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {id: 3, url: 'img/spots/pacha.jpg', sports: ['Longboard', 'skate'], name: 'Pachá Skate Park', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {id: 4, url: 'img/spots/garrahan.jpg', sports: ['BMX', 'Skate'], name: 'Garrahan', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."}
 ];

var riders = [
    {id: 1, photo_url: 'img/teams/img1.png', sport: 'Longboard', name: 'Damián Nehemias', alias: 'dnehemias', procedence: "Berazategui, Buenos Aires, Argentina 1", residence: "Berazategui, Buenos Aires, Argentina", stance: "Bueno", spot: spots[0], birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"},
    {id: 2, photo_url: 'img/teams/img2.png', sport: 'Longboard', name: 'Sebastián Muñoz', alias: 'smunoz', procedence: "Bella Vista, Buenos Aires, Argentina 1", residence: "Bella Vista, Buenos Aires, Argentina", stance: "Bueno", spot: spots[0], birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"},
    {id: 3, photo_url: 'img/teams/img3.png', sport: 'Longboard', name: 'Thomas Duarte', alias: 'tduarte', procedence: "Tortuguitas, Buenos Aires, Argentina 1", residence: "Tortuguitas, Buenos Aires, Argentina", stance: "Bueno", spot: spots[0], birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"},
    {id: 4, photo_url: 'img/teams/img4.png', sport: 'Longboard', name: 'Valentín Travis Spalla', alias: 'vspalla', procedence: "San Miguel, Buenos Aires, Argentina 1", residence: "San Miguel, Buenos Aires, Argentina", stance: "Bueno", spot: spots[0], birthdate: "11/09/1994", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"}
];

var photos = [
    {id: 1, url: 'img/gallery/img1.jpg', spot: spots[0], sport: "Skate", riders: riders.slice(0,2), date: "23 Diciembre, 2015", title: 'Facultad de medicina', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 2, url: 'img/gallery/img2.jpg', spot: spots[0], sport: "Longboard", riders: riders, date: "23 Diciembre, 2015", title: 'Bajando el libano', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 3, url: 'img/gallery/img1.jpg', spot: spots[0], sport: "Skate", riders: riders, date: "23 Diciembre, 2015", title: 'Facultad de medicina', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 4, url: 'img/gallery/img2.jpg', spot: spots[0], sport: "Longboard", riders: riders, date: "23 Diciembre, 2015", title: 'Bajando el libano', description: "Short description of the photo."},
    {id: 5, url: 'img/gallery/img1.jpg', spot: spots[0], sport: "Skate", riders: riders, date: "23 Diciembre, 2015", title: 'Facultad de medicina', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 6, url: 'img/gallery/img2.jpg', spot: spots[0], sport: "Longboard", riders: riders, date: "23 Diciembre, 2015", title: 'Bajando el libano', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 7, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 8, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 9, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 10, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 11, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 12, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 13, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 14, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 15, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 16, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 17, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 18, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 19, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 20, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 21, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 22, url: 'img/gallery/img3.jpg', spot: spots[0], sport: "BMX", riders: riders, date: "23 Diciembre, 2015", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."}
];

var posts = [
    {id: 1, url: 'img/blog/img1.jpg', riders: riders.slice(0,2), spot: spots[0], title: 'Nuevo skatepark en plaza Houssay', type: 'image', sport: 'Longboard', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 2, url: 'img/blog/img2.jpg', riders: riders.slice(0,2), spot: spots[0], title: 'Evento en el Libano', type: 'image', sport: 'Longboard', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 3, url: 'img/blog/img3.jpg', riders: riders.slice(0,2), spot: spots[0], title: 'Aaron Rios se suma al team de Outsider', type: 'image', sport: 'Skate', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 4, url: '//player.vimeo.com/video/113463529?title=0&byline=0&portrait=0', riders: riders.slice(0,2), spot: spots[0], title: 'Arte con tablas por Matt Gahan', type: 'video', sport: 'Surf', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 5, url: 'img/blog/img2.jpg', riders: riders.slice(0,2), spot: spots[0], title: 'Evento en el Libano', type: 'image', sport: 'Longboard', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 6, url: 'img/blog/img1.jpg', riders: riders.slice(0,2), spot: spots[0], title: 'Nuevo skatepark en plaza Houssay', type: 'image', sport: 'Skate', date: "24 de Enero, 2016", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."}
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
app.post('/admin/posts', function(req, res) {
    res.status(200);
    res.send(user);
});

//Post
app.post('/admin/photos', function(req, res) {
    res.status(200);
    res.send(user);
});

//Team member
app.post('/admin/teamMembers', function(req, res) {
    res.status(200);
    res.send(user);
});

//Spot
app.post('/admin/spots', function(req, res) {
    res.status(200);
    res.send(user);
});

var server = app.listen(5000, function() {
  console.log("Api started in port: 5000");
});

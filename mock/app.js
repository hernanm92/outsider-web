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
    {alias:'libano', url: 'img/spots/libano.jpg', sports: ['Longboard'], name: 'Líbano', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {alias:'colon', url: 'img/spots/colon.jpg', sports: ['Skate'], name: 'Teatro Colón', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {alias:'haiti', url: 'img/spots/haiti.jpg', sports: ['BMX', 'Skate'], name: 'Plaza Haití', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {alias:'garrahan', url: 'img/spots/garrahan.jpg', sports: ['Skate'], name: 'Garrahan', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {alias:'sanmartin', url: 'img/spots/retiro.jpg', sports: ['Skate'], name: 'Plaza San Martin', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."},
    {alias:'llolleo', url: 'img/spots/llolleo.jpg', sports: ['BMX'], name: 'Skatepark Llolleo', address: "República del Líbano, Ciudad Autónoma de Buenos Aires", latitude: -34.5844409, longitude: -58.3948475, description: "Terrible lugar para bajar en long, pista larga y con buenas curvas para tirar trucos copados."}
 ];

//birthdate format: 11/09/1994
var riders = [
    {alias: 'dnehemias', photo_url: 'img/teams/img1.png', sport: 'Longboard', name: 'Damián Nehemias', nickname: 'Dami', procedence: "Berazategui, Buenos Aires, Argentina 1", residence: "Berazategui, Buenos Aires, Argentina", stance: "Bueno", spots: [{id: spots[0].alias, name: spots[0].name}], birthdate: "1992-03-06T23:31:49.383Z", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"},
    {alias: 'smunoz', photo_url: 'img/teams/img2.png', sport: 'Longboard', name: 'Sebastián Muñoz', nickname: 'Seba', procedence: "Bella Vista, Buenos Aires, Argentina 1", residence: "Bella Vista, Buenos Aires, Argentina", stance: "Bueno", spots: [{id: spots[1].alias, name: spots[1].name}, {name: "Libano"}], birthdate: "1992-03-06T23:31:49.383Z", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"},
    {alias: 'tduarte', photo_url: 'img/teams/img3.png', sport: 'Longboard', name: 'Thomas Duarte', nickname: 'Thomi', procedence: "Tortuguitas, Buenos Aires, Argentina 1", residence: "Tortuguitas, Buenos Aires, Argentina", stance: "Bueno", spots: [{name: "Libano"}], birthdate: "1992-03-06T23:31:49.383Z", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"},
    {alias: 'vspalla', photo_url: 'img/teams/img4.png', sport: 'Longboard', name: 'Valentín Travis Spalla', nickname: 'Valen', procedence: "San Miguel, Buenos Aires, Argentina 1", residence: "San Miguel, Buenos Aires, Argentina", stance: "Bueno", spots: [{id: spots[0].alias, name: spots[0].name}, {id: spots[1].alias, name: spots[1].name}], birthdate: "1992-03-06T23:31:49.383Z", quote: "Me encanta patinar, siento que el riesgo es la mejor sensacion que existe llevando todo al limite", description: "Longboard rider freestyle y con mucho talento. Practica hace anos y suele ir al libano a hacer bajadas como un loco.", facebook: "https://www.facebook.com/outsiderapplication", instagram: "https://www.instagram.com/outsideride", twitter: "https://www.twitter.com/outsiderok"}
];

//date format: 23 Diciembre, 2015
var photos = [
    {id: 1, url: 'img/gallery/img1.jpg', spot: {id: spots[0].alias, name: spots[0].name}, sport: "Skate", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-01T23:31:49.383Z", title: 'Facultad de medicina', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 2, url: 'img/gallery/img2.jpg', spot: {id: spots[1].alias, name: spots[1].name}, sport: "Longboard", riders: [{id: riders[0].alias, name: riders[0].name}, {id: riders[1].alias, name: riders[1].name}], date: "2016-03-01T23:31:50.383Z", title: 'Bajando el libano', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 3, url: 'img/gallery/img1.jpg', spot: {name: 'Plaza Houssay'}, sport: "Skate", riders: [{name: "Damián Nehemias"}], date: "2016-03-02T23:31:49.383Z", title: 'Facultad de medicina', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 4, url: 'img/gallery/img2.jpg', spot: {id: spots[0].alias, name: spots[0].name}, sport: "Longboard", riders: [{name: "Damián Nehemias"}, {id: riders[0].alias, name: riders[0].name}], date: "2016-03-03T23:31:49.383Z", title: 'Bajando el libano', description: "Short description of the photo."},
    {id: 5, url: 'img/gallery/img1.jpg', spot: {name: 'Plaza Houssay'}, sport: "Skate", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-04T23:31:49.383Z", title: 'Facultad de medicina', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 6, url: 'img/gallery/img2.jpg', spot: {name: 'Plaza Houssay'}, sport: "Longboard", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Bajando el libano', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 7, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 8, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 9, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 10, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 11, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 12, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 13, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 14, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 15, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 16, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 17, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 18, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 19, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 20, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 21, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 22, url: 'img/gallery/img3.jpg', spot: {name: 'Plaza Houssay'}, sport: "BMX", riders: [{id: riders[0].alias, name: riders[0].name}], date: "2016-03-06T23:31:49.383Z", title: 'Llolleo', description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."}
];

var posts = [
    {id: 1, url: 'img/blog/img1.jpg', title: 'Nuevo skatepark en plaza Houssay', type: 'image', sport: 'Longboard', date: "2016-03-06T23:31:49.383Z", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 2, url: 'img/blog/img2.jpg', title: 'Evento en el Libano', type: 'image', sport: 'Longboard', date: "2016-03-06T23:31:49.383Z", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 3, url: 'img/blog/img3.jpg', title: 'Aaron Rios se suma al team de Outsider', type: 'image', sport: 'Skate', date: "2016-03-06T23:31:49.383Z", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 4, url: '//player.vimeo.com/video/113463529?title=0&byline=0&portrait=0', title: 'Arte con tablas por Matt Gahan', type: 'video', sport: 'Surf', date: "2016-03-06T23:31:49.383Z", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 5, url: 'img/blog/img2.jpg', title: 'Evento en el Libano', type: 'image', sport: 'Longboard', date: "2016-03-06T23:31:49.383Z", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."},
    {id: 6, url: 'img/blog/img1.jpg', title: 'Nuevo skatepark en plaza Houssay', type: 'image', sport: 'Skate', date: "2016-03-06T23:31:49.383Z", description: "Nullam elementum tincidunt massa, a pulvinar leo ultricies ut. Ut fringilla lectus tellus, imperdiet molestie est volutpat at. Sed viverra cursus nibh, sed consectetur ipsum sollicitudin sed. Cras erat est, euismod id congue sed, sollicitudin sed odio. Nullam non metus in mi rhoncus efficitur..."}
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
app.options('/admin/login', function(req, res) {
    res.status(200);
    res.send('{"message":"ok"}')
});

app.post('/admin/login', function(req, res) {
    if (req.body.username === 'admin' && req.body.password === 'secret') {
        res.status(200);
        res.send({message: "ok"});
    } else {
        res.status(200);
        res.send({message:"Wrong"});
    }
});

//Post
app.options('/admin/posts', function(req, res) {
    res.status(200);
    res.send('{"message":"ok"}')
});

app.post('/admin/posts', function(req, res) {
    res.status(200);
    res.send(user);
});

//Post
app.options('/admin/photos', function(req, res) {
    res.status(200);
    res.send('{"message":"ok"}')
});

app.post('/admin/photos', function(req, res) {
    res.status(200);
    res.send(user);
});

//Team member
//todo: pondria la url con '-', no cammelcase
app.options('/admin/teamMembers', function(req, res) {
    res.status(200);
    res.send('{"message":"ok"}')
});

app.post('/admin/teamMembers', function(req, res) {
    res.status(200);
    res.send(user);
});

//Spot
app.options('/admin/spots', function(req, res) {
    res.status(200);
    res.send('{"message":"ok"}')
});

app.post('/admin/spots', function(req, res) {
    res.status(200);
    res.send(user);
});

var server = app.listen(5000, function() {
  console.log("Api started in port: 5000");
});

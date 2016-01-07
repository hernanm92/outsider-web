/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


var env = 'development';

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/general/home', function (req, res) {
    res.render('general/home');
});
app.get('/general/gallery', function (req, res) {
    res.render('general/gallery');
});
app.get('/general/teams', function (req, res) {
    res.render('general/teams');
});
app.get('/general/blog', function (req, res) {
    res.render('general/blog');
});
app.get('/general/blog-item', function (req, res) {
    res.render('general/blog-item');
});
app.get('/general/gallery-item', function (req, res) {
    res.render('general/gallery-item');
});
app.get('/general/team-item', function (req, res) {
    res.render('general/team-item');
});
app.get('/partials/404', function (req, res) {
    res.render('partials/404');
});
app.get('/general/admin/login', function (req, res) {
    res.render('general/admin/login');
});

http.createServer(app).listen(app.get('port'), function ()
{
    console.log('Express server listening on port ' + app.get('port'));
});

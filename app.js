var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

var cors = require('cors');
var passport = require('passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);


var mongoose = require('mongoose');
mongoose.connect('mongodb://prueba:prueba@ds033831.mongolab.com:33831/mean', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

var models = require('./models/tvshow')(app, mongoose);
require('./models/user');


var authCtrl= require('./controllers/auth');
var auth = express.Router();
auth.route('/login')
	.post(authCtrl.login);
app.use('/api', auth);

app.use(passport.initialize());


var TVShowCtrl = require('./controllers/tvshows');

// API routes
var tvshows = express.Router();
tvshows.route('/tvshows')
  .get(authCtrl.isLogged, TVShowCtrl.findAllTVShows)
  .post(authCtrl.isLogged, TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(authCtrl.isLogged, TVShowCtrl.findById)
  .put(authCtrl.isLogged, TVShowCtrl.updateTVShow)
  .delete(authCtrl.isLogged, TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);



// Load required packages
var UserCtrl = require('./controllers/users');
var users = express.Router();

// Create endpoint handlers for /users
users.route('/users')
  .post(authCtrl.isLogged, UserCtrl.postUsers)
  .get(authCtrl.isLogged, UserCtrl.getUsers);

app.use('/api', users);



// Ruta solo accesible si estás autenticado
router.get('/private', authCtrl.isLogged, function(req, res) {
	res.send('visible');
});



app.listen(3000, function() {
  console.log("ok");
});
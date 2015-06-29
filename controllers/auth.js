// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var mongoose = require('mongoose');
var User  = mongoose.model('User');
var service = require('../services/service');
var jwt = require('jwt-simple');  
var moment = require('moment');  


passport.use(new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));
exports.isAuthenticated = passport.authenticate('basic', { session : false });

exports.isLogged =  function(req, res, next) {  
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, 'abc');
  console.log('exp', payload.exp);
  console.log('now', moment().unix());
  if(payload.exp <= moment().unix()) {
     return res
        .status(401)
        .send({message: "El token ha expirado"});
  }

  req.user = payload.sub;
  next();
}

exports.signup = function(req, res) {  
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};

exports.login = function(req, res) {  
    User.findOne({username: req.body.username.toLowerCase()}, function(err, user) {
        if (err) { console.log(err) }

        if (!user) {
          return res
            .status(500)
            .send({error: 'no pass'});
        }
        user.verifyPassword(req.body.password, function(err, isMatch) {
          if (err) { console.log(err) }
          if (!isMatch) { 
            return res
            .status(500)
            .send({error: 'no pass'});
          }
          return res
            .status(200)
            .send({token: service.createToken(user)});

        })
    });
};


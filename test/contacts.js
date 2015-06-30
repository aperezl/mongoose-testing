'use strict';

var utils = require('./utils');
var should = require('should');
var User = require('../models/user');


describe('Users: models', function() {
  describe('#addContact()', function() {
    it('should create a new User Conctact', function(done) {
      var u = new User({
        username: 'demo1',
        password: 'demo1'
      });

      u.save(function(err, createdUser) {
        should.not.exists(err); 
        createdUser.username.should.equal('demo1');
	      //createdUser.password.should.equal('$2a$05$PIn6I2/L/M5JeaLnsYRyI.ZzAPboOZPK.fFkqyGg59TyYe8HTNwvy');
        User.findOne({username: 'demo1'}).exec(function(err, doc) {
          u.addContact();
          done(); 
        })
            
      });

    });
  });
});

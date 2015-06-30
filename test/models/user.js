'use strict';

var utils = require('../utils');
var should = require('should');
var User = require('../../models/user');
var userCtrl = require('../../controllers/users');


describe('Users: models', function() {
  describe('#create()', function() {
    it('should create a new User', function(done) {
      var u = new User({
        username: 'aaa',
        password: 'demo1'
      });

      u.save(function(err, createdUser) {
        should.not.exists(err); 
        createdUser.username.should.equal('aaa');
	//createdUser.password.should.equal('$2a$05$PIn6I2/L/M5JeaLnsYRyI.ZzAPboOZPK.fFkqyGg59TyYe8HTNwvy');  
        done();      
      });
    });
  });
});

'use strict';

var utils = require('./utils');
var should = require('should');
var User = require('../models/user');

describe('Users: models', function() {
  describe('#create()', function() {
    it('should create a new User', function(done) {
      var u = {
        username: 'demo1',
        password: 'demo1'
      };

      User.create(u, function(err, createdUser) {
        should.not.exits(err);
        done();      
      });
    });
  });
});

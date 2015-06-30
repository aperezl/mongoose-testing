'use strict';

var utils = require('../utils');
var should = require('should');
var Group = require('../../models/group');
var User = require('../../models/user');


describe('Group: models', function() {
  describe('#create()', function() {
    it('should create a new Group', function(done) {
      var u = new User({
        username: 'demo1',
        password: 'demo1'
      });

      u.save(function(err, createdUser) {
        should.not.exists(err); 
        createdUser.username.should.equal('demo1');
        var g = new Group({
          title: 'grupo1',
          description: 'Grupo 1',
          _owner: createdUser._id
        });
        g.save(function(err, createdGroup) {
          should.not.exists(err);
          createdGroup.title.should.equal('grupo1');
          done();
        });
      });
    });
  });
});

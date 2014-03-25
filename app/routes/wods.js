
'use strict';

var Wod = require('../models/wod');
var User = require('../models/user');
//var request = require('request');

exports.index = function(req, res){
  User.findById(req.session.userId, function(user){
    res.render('wods/index', {user:user});
  });
};

exports.retrieveAll = function(req, res) {
  Wod.findAll(function(wods){
    res.send(wods);
  });
};

exports.create = function(req, res){
  req.body.movement = req.body.movement.replace(/\s/g,'').toLowerCase().split(',');
  
  var wod = new Wod(req.body);
  wod.insert(function(err){
    console.log(err);
    res.redirect('/users/show');
  });
};

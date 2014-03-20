
'use strict';

var Wod = require('../models/wod');
var User = require('../models/user');
//var request = require('request');

exports.index = function(req, res){
  
  User.findById(req.session.userId, function(user){
    res.render('wods/index', {user:user});
  });
};

exports.create = function(req, res){
  var categories = [];
  categories.push(req.body.cat1);
  categories.push(req.body.cat2);
  categories.push(req.body.cat3);
  console.log(categories);
  req.body.categories = categories;
  var wod = new Wod(req.body);
  wod.insert(function(err){
    console.log('WOD CREATE ERROR???');
    console.log(err);
    res.redirect('/users/show');
  });
};

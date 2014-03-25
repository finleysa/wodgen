'use strict';

var User = require('../models/user');

exports.index = function(req, res){
  User.findById(req.session.userId, function(user){
    res.render('home/index', {user:user});
  });
};

exports.failedLogin = function(req, res){
  res.render('home/index', {fail: 'Login Incorrect. Please try again.'});
};

exports.failedRegister = function(req, res){
  res.render('home/index', {fail: 'E-mail already registered.'});
};

exports.failedAddWod = function(req, res){
  res.render('home/index', {fail: 'Sign in to use this feature.'});
};

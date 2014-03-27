'use strict';

var User = require('../models/user');
var Wod = require('../models/wod');
//var gravatar = require('gravatar');
//var request = require('request');

exports.register = function(req, res){
  var user = new User(req.body);
  user.hashPassword(function(){
    user.addCover(req.files.cover.path);
    user.insert(function(){
      if(user._id){
        req.session.userId = user._id;
        res.redirect('');
      }else{
        res.redirect('/failedregister');
      }
    });
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.login = function(req, res){
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();
        req.session.save(function(){
          res.redirect('/users/show');
        });
      });
    }else{
      req.session.destroy(function(){
        res.redirect('/failedlogin');
      });
    }
  });
};

exports.show = function(req, res){
  User.findById(req.session.userId, function(user){
    if(user) {
      res.render('users/show', {user:user});
    }else{
      res.redirect('/failedaddwod');
    }
  });
};

exports.addWod = function(req, res){
  Wod.findByName(req.params.wodName, function(wod){
    console.log('1');
    User.findById(req.session.userId, function(user){
      console.log('2');
      if (user){
        user.updateWods(wod, function(){
          console.log('3');
          res.redirect('users/show');
        });
      }else{
        res.redirect('/failedaddwod');
      }
    });
  });
};


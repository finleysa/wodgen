'use strict';

var User = require('../models/user');
//var gravatar = require('gravatar');
//var request = require('request');

exports.register = function(req, res){
  var user = new User(req.body);
  user.hashPassword(function(){
    user.insert(function(){
      if(user._id){
        req.session.userId = user._id;
        res.render('home/index', {user:user});
      }else{
        res.redirect('/');
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
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(user);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();
        req.session.save(function(){
          res.render('home/index', {user:user});
        });
      });
    }else{
      req.session.destroy(function(){
        res.redirect('/broken');
      });
    }
  });
};

/*
exports.show = function(req, res){
  User.findById(req.session.userId, function(user){

    Item.findByUserId(req.session.userId, function(items){
      res.render('users/show', {user:user, items:items, gravatar: url});
    });
  });
};
*/

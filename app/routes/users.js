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
        res.redirect('/users/show');
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

exports.finishedWod = function(req, res) {
  console.log(req.body);
  User.finished(req.body.email, req.body.wodName, req.body.date, req.body.score, function(data){
    res.send(data);
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
    User.findById(req.session.userId, function(user){
      if (user){
        user.updateWods(wod, function(){
          res.redirect('users/show');
        });
      }else{
        res.redirect('/failedaddwod');
      }
    });
  });
};

exports.returnFinished = function(req, res){
  User.findById(req.session.userId, function(wods){
    res.send(wods.finishedWods);
    //res.send({user:user.finishedWods});
  });
};

exports.graph = function(req, res){
  res.render('wods/graph', {wodName:req.params.wodName});
};

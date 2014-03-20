'use strict';

var User = require('../models/user');

exports.index = function(req, res){
  User.findById(req.session.userId, function(user){
    res.render('home/index', {user:user});
  });
};


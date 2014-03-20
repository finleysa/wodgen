'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var users = require('../routes/users');
  var wods = require('../routes/wods');

  app.get('/', d, home.index);
  app.post('/register', d, users.register);
  app.post('/logout', d, users.logout);
  app.post('/login', d, users.login);
  app.get('/users/show', d, users.show);
  app.post('/wods/add', d, wods.create);
  app.get('/wods', d, wods.index);
  console.log('Routes Loaded');
  fn();
}


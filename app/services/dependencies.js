// Dependencies are core modules (not express middlewares) used globally

module.exports = function(server) {

  db          = require('mongojs')(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}`, []);
  ObjectId    = require('mongodb').ObjectID;
  jwt         = require('jsonwebtoken');
  Joi         = require('joi');
  token       = require('./token');
  logError    = require('./log-error');
  io          = require('socket.io')(server);
  redis       = require('socket.io-redis');
  io.adapter(redis({ host: 'localhost', port: 6379 }));
  io.set('origins', '*:*');
  client = require('redis').createClient();
  io.on("connection", socket => {
    // Listen for socket emits, maybe for registering/leaving a room
  });
  DOMParser   = require('xmldom').DOMParser;
  sms         = require('./sms');
  request     = require('request');

};

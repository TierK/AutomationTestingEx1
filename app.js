var express = require('express');
var lowdb = require('lowdb');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var app = express();
app.db = lowdb(actors-db.json);
app.use(bodyParser.json());
app.get('/actors', function(req, res) {
  return res.json(app.db('actors'));
});
app.get('/actors/:id', function(req, res) {
  var id = req.params.id;
  var actor = app.db('actors').find({ id: id });
  if (actor) {
    return res.json(actor);
  }
  return res.status(404).end();
});
app.post('/actors', function(req, res) {
  var actor = req.body;
  actor.id = uuid();
  app.db('actors').push(actor)
  return res.status(201).end();
});
app.put('/actors/:id', function(req, res) {
  var id = req.params.id;
  var actor = req.body;
  app.db('actors')
    .chain()
    .find({ id: id })
    .assign(actor)
    .value()
  return res.status(201).end();
});
app.delete('/actors/:id', function(req, res) {
  var id = req.params.id;
  app.db('actors').remove({ id: id });
  return res.status(201).end();
});
app.listen(3000, function() {
  console.log('API running');
});
module.exports = app;
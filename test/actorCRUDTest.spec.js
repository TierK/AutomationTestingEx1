
var supertest = require('supertest');
var chai = require('chai');
var uuid = require('uuid');
var app = require('../app');
global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = supertest(app);


// Find Actor testing
describe("GET /actors/:id", function () {
  it("returns a actor by id", function (done) {
    var actor = app.db("actors").first();
    request
      .get("/actors/" + actor.id)
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.eql(actor);
        done(err);
      });
  });

  it("returns status 404 when id is not found", function (done) {
    var actor = { id: "fakeId" };
    request
      .get("/actors/" + actor.id)
      .expect(404)
      .end(function (err, res) {
        done(err);
      });
  });
});

//Create New (PUT) Actor Testing
describe("PUT /actors/:id", function () {
  it("updates a actor", function (done) {
    var actor = app.db("actors").first();
    request
      .put("/actors/" + actor.id)
      .send({
        name: "Keanu Charles Reeves",
        age: 57,
        genre: ["drama", "action", "comedy"],
        address: "Hawthorne, California, USA",
        yearsOfExperience: 38,
      })
      .expect(201)
      .end(function (err, res) {
        done(err);
      });
  });
});

// Save Actor testing
describe("POST /actors", function () {
  it("saves a new actor", function (done) {
    request
      .post("/actors")
      .send({ title: "run", done: false })
      .expect(201)
      .end(function (err, res) {
        done(err);
      });
  });

  // Delete Actor testing
  describe('DELETE by id', function() {
    it('removes a actor', function(done) {
      var actor = app.db('actors').first();
      request.put('/actors/' + actor.id)
        .expect(201)
        .end(function(err, res) {
          done(err);
        });
    });
  });

});

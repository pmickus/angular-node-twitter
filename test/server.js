var request = require("request");
var mongoskin = require("mongoskin");
var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true});
var base_url = "http://localhost:3000/api/";
var chai = require('chai');
var expect = chai.expect;

describe("RESTful Server", function() {
  describe("GET /", function() {
    var statusCode = {};
    beforeEach(function(done) {
      request.get(base_url, function(error, response, body) {
        statusCode = response.statusCode
        done();
      });
    });
    it("returns status code 200", function(done) {
       expect(statusCode).to.equal(200);
      done();
    });
  });
  describe("GET /:collection", function() {
    var json = {};
    beforeEach(function(done) {
      var url = base_url + "collection"
      request.get(url, function(error, response, body) {
        json = JSON.parse(body);
        done();
      });
    });
    it("returns a JSON ", function(done) {
      expect(json).to.be.an("array");
      done();
    });
  });
  describe("POST /:collection", function() {
    var collection = {};
    var results = {};
    beforeEach(function(done) {
      db.collection('collection').find().toArray(function(error, result) {
        collection = result;
        done();
      });
    });
    beforeEach(function(done) {
      var url = base_url + "collection";
      var body = { name: "Paul" };
      var json = JSON.stringify(body);
      request.post(url, { json: true, body: json }, function(error, response, body) {
        if (response.statusCode == 200) {
          done();
        }
      });
    }); 
    beforeEach(function(done) {
      db.collection('collection').find().toArray(function(error, result) {
        results = result;
        done();
      });
    }); 
    it("inserts a collection into the db", function(done)  {
      expect(results.length).to.be.above(collection.length); 
      done();
    });
  });   
});


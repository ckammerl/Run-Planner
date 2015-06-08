var chai = require('../node_modules/chai/chai.js');
var request = require('supertest');
var db = require('../server/db.js');
var app = require('../server/server.js').app;
var should = require('should');
var assert = chai.assert,  
    expect = chai.expect

describe('API calls', function() {
  it('should test call to weather api', function(done) {
    request(app)
    .get('/api/weather?zipCode=60103')
    .expect(404)
    .end(function(e, res) {
      res.body.zipCode.should.exist;
      res.body.zipCode.should.equal('60103');
      res.body.weather.should.exist;
      res.body.weather.should.be.type('string');
      res.body.temp.F.should.exist;
      done();
    });
  });
});

// test that the weather api gives us back teh same zip code
// provides the temp in F
var chai = require('../node_modules/chai/chai.js');
var request = require('request');

var serverHost = 'http://localhost:3000';
var supertest = require('supertest');
var request = supertest(serverHost);
var db = require('../server/db.js');

var assert = chai.assert,  
    expect = chai.expect,
    should = chai.should(); // Note that should has to be executed


describe('Account', function() {
    it('should return error trying to save duplicate username', function(done) {
      var profile = {
        username: 'vgheri',
        password: 'test',
        firstName: 'Valerio',
        lastName: 'Gheri'
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
    request(url)
  .post('/api/profiles')
  .send(profile)
    // end handles the response
  .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.should.have.status(400);
          done();
        });
    });
    it('should correctly update an existing account', function(done){
  var body = {
    firstName: 'JP',
    lastName: 'Berd'
  };
  request(url)
    .put('/api/profiles/vgheri')
    .send(body)
    .expect('Content-Type', /json/)
    .expect(200) //Status code
    .end(function(err,res) {
      if (err) {
        throw err;
      }
      // Should.js fluent syntax applied
      res.body.should.have.property('_id');
                  res.body.firstName.should.equal('JP');
                  res.body.lastName.should.equal('Berd');                    
                  res.body.creationDate.should.not.equal(null);
      done();
    });
  });
  });
});


// describe('server response', function () {
//   // before(function () {
//   //   server.listen(8000);
//   // });

//   // after(function () {
//   //   server.close();
//   // });

//   it('get request should respond with league information', function(done) {
//     agent.get("/league/" + leagueId)
//         .expect(200)
//         .expect(function(res) {
//           res.body.id.should.equal(leagueId);
//           res.body.name.should.equal(testLeague.name);
//           res.body.show.should.equal(testLeague.show);
//           res.body.owner.should.exist;
//           res.body.roster_limit.should.equal(testLeague.roster_limit);
//         })
//         .end(function (err, res) {
//           utils.errOrDone(err, res, done);
//         });
//   })

// });
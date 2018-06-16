'use strict';

const chai = require('chai');
const expect = require('chai').expect;
var request = require('supertest');

chai.use(require('chai-http'));

const app = require('../src/index.js');
var should = require('chai').should();
var token;
describe('Login API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/user/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ username: 'test', password: 'test' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
           token = response.body.data.token;
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    });

   it('should get success if session for current user is valid', function (done) {
   chai.request(app)
   .get('/transactions')
   .set('x-access-token',token)
   .end(function (err, res) {
       res.body.success.should.equal(true);
       done();
     });
   });

});

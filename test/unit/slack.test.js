const express = require('express');
const request = require('supertest');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
// const bodyparser = require('body-parser');

let modelStub;

function setup(slack) {
  let app = express();
  app.use('/slack',slack);
  return app;
  
}

beforeEach(() => {
  modelStub = sinon.stub;
});

test('should return OK 200 when making a request with user_id', function(done) {
  let slack = proxyquire('../../src/routes/slack', {
    '/../../models/standupConfig': modelStub
  });
  let app = setup(slack);
  request(app)
    .post('/slack')
    .type('application/x-www-form-urlencoded')
    .send({user_id:'fake_id'})
    .expect(200,done);
});

test('should return 400 bad request when a request with no user_id is made', function(done) {
  let slack = proxyquire('../../src/routes/slack', {
    '/../../models/standupConfig': modelStub
  });
  let app = setup(slack);
  request(app)
    .post('/slack')
    .expect(400,done);
});

const proxyquire = require('proxyquire');
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const bodyparser = require('body-parser');
const assert = require('assert');

describe('/slack endpoint', function() {
  let app, slack;
  const standupConfig = require('../../models/standupConfig');
  const mongoose = require('mongoose');

  // why did I get reference errors when this was inside beforeEach() ?
  let connectStub = sinon.stub(mongoose, 'connect').returns('stubbed connect method');
  let findOneStub = sinon.stub(standupConfig,'findOne').returns(null); // will return null instead of [] because we are using standupConfig.findOne()
  let sendSpy = sinon.spy();
  beforeEach(function() {
    slack = proxyquire('../../src/routes/slack',{
      'mongoose': {
        'connect': connectStub
      },
      'standupConfig': {
        'findOne': findOneStub
      },
      'authLinks': {
        'send': sendSpy
      }
    });
    app = express();
    app.use(bodyparser.json());
    app.use('/slack',slack);
  });  

  it('returns OK 200 message when posting to /slack with a non-empty string as a user_id', function(done) {
    request(app)
      .post('/slack')
      .send({'user_id': 'testid'})
      .expect(200, done);
  });
  
  it('returns a 422 Bad input response when posting to /slack with no user_id', function(done) {
    request(app)
      .post('/slack')
      .expect(422,done);
  });

  it('if a user_id with no configuration info saved calls standup-helper, authLinks.send() is called', function(done) {
    request(app)
      .post('/slack')
      .send({'user_id': 'testid'})
      .expect(200);

    assert(sendSpy.called, done);
    done();
    
    
  });

});
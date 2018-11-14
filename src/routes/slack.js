const authLinks = require('../authLinks');

const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
  extended: true
});

// set winston logging level
const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

const standupConfig = require('../../models/standupConfig'); // import mongoose model

// Route which slack app 'slash command' hits to GET STANDUP
router.post('/', urlencoded, function (req, res) {
  let user_id = req.body.user_id;
  logger.log('debug', 'request recieved', {
    id: user_id
  });

  // make sure there is a valid user_id in this request
  if (user_id && user_id !== '') {

    // retrieve user_config from MongoDB
    standupConfig.findOne({ user_id: user_id }, function mongoCallback(err, user_config) {
      if (err) {
        logger.log('error', 'There was an error attempting to retrieve user_config', { user_id: user_id, error: err });
      } else {
        logger.log('debug', 'got user_config', { user_config: user_config });

        // there was a user_config in our db for this user_id
        if (user_config) {
          logger.log('debug', 'retrieving standup for user after getting user_config', {user_config:user_config});

          // there was not a user_config in our db for this user_id
        } else {
          authLinks.send();
          logger.log('debug', 'authLinks.send() was called');
        }
      }
    });
    logger.log('debug', 'this logging message, should it come first?'); 
    res.sendStatus(200); // will get back to slack immediatly, all other interaction in mongoCallback will be done w/ response url

  // There was no user_id in this request
  } else {
    res.sendStatus(400);
  }

});

module.exports = router;
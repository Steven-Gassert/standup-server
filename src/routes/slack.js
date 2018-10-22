const authLinks = require('../authLinks');

const express = require('express');
let router = express.Router();

// set winston logging level
const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

// connect to mongodb
const mongoose = require('mongoose');
const standupConfig = require('../../models/standupConfig');
try {
  const connectionString = require('../dbconfig');
  mongoose.connect(connectionString); // connect to mongo db using credentials returned from ../dbconfig.js
} catch(error) {
  logger.log('error', 'mongoose was unable to connect our mongodb', {error:error});
}

// Route which slack app 'slash command' hits to GET STANDUP
router.post('/', function(req,res) {
  let user_id = req.body.user_id;
  logger.log('debug',{user_id:user_id});

  // make sure there is a valid user_id in this request
  if (user_id && user_id !== '') {
    let user_config = standupConfig.findOne({user_id: user_id}); // retrieve user_config from MongoDB

    // there was a user_config in our db for this user_id
    if (user_config) {
      logger.log('debug', 'retrieving standup for user after getting user_config', {user_config:user_config});
      res.send(200).json({user_config: user_config});

    // there was not a user_config in our db for this user_id
    } else {
      authLinks.send();
      res.sendStatus(200);
    }

  } else {
    res.sendStatus(422);
  }

});

module.exports = router;
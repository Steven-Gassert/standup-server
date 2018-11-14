'use strict';

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

// load env variables
const dotenv = require('dotenv');
dotenv.load();

//Set up mongoose connection
const connectionString = require('./dbconfig');
console.log(connectionString);
mongoose.connect(connectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let app = express();
app.use('/',routes);


module.exports = app;
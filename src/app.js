//'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes');

let app = express();
app.use(bodyparser.json());
app.use('/',routes);

module.exports = app;
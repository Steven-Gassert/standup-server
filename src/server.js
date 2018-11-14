'use strict';

require('dotenv').config({silent: true});

let server = require('./app');
let port = process.env.PORT || 3000;

server.listen(port, function() {
  // eslint-disable-next-line
  console.log('Server running on port: %d', port);
});
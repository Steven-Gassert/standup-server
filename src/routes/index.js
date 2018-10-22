const slack = require('./slack');
const express = require('express');

let router = express.Router();
router.use('/slack', slack);

module.exports = router;

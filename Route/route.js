const spawn = require('child_process').spawn;
const axios = require('axios')
const express = require('express');
const route = express.Router();
const home = require('../API/routes/api_route');
const { request } = require('http');
route.use('/', home);


module.exports = route;

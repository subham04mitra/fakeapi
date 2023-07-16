const { request } = require('express');
const express = require('express');
const route = express.Router();
const control = require('../controller/controller');
route.get('/users', control.getallUsers);
route.put('/users/:id', control.updateUsers);
route.get('/users/:id',  control.getUsersbyId);
route.post('/users', control.createUsers);
route.delete('/users/:id',  control.deleteUsers);
module.exports = route;


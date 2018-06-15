// src / routes / middlewares / auth.js
'use strict';

// Imports
const jwt = require('jsonwebtoken');

const config = require('../../config/index');

// Auth Middleware
let authMiddleware = function (request, response, next) {
  // console.log('request', request);
  // console.log('authmiddle', request.body.token,'===' ,request.query.token, '===',request.headers['x-access-token'], '===',request.cookies.token);
    let token = request.body.token || request.query.token || request.headers['x-access-token'] || request.cookies.token;
    if(token && token != 'null') {
        request.user = jwt.verify(token, config.secret);
    } else {
        request.user = {};
    }
    // console.log('test',request.user);
    next();
};

// Export
module.exports = authMiddleware;

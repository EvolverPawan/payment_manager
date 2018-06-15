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
    console.log('token', token);
    if(token && token != 'null') {
        request.user = jwt.verify(token, config.secret);
    } else {
        request.user = {};
        let responseData = {
            success: false,
            data: {},
            errors: []
        };
        response.json(responseData);
        return ;
    }
    console.log(request.user);
    next();
};

// Export
module.exports = authMiddleware;

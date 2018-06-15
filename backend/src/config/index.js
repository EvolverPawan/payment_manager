// src / config / index.js
'use strict';

const config = {
    port: 5001,
    secret: 'super-secret-key',
    databaseUrl: 'mongodb://localhost/paymentManager',
    saltRounds: 10
};

module.exports = config;

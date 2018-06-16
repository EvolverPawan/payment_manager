'use strict';

// Imports
const express = require('express');
const isEmpty = require('lodash/isEmpty');
const moment = require('moment');

// App Imports
const config = require('./../config');
let authMiddleware = require('./middlewares/auth');
let Transaction = require('../models/transaction');

// Common Routes
let transactionRoutes = express.Router();

// Transactions
transactionRoutes.get('/transactions', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };
// console.log('request', request);
    Transaction.find({},[],{sort:{
        createdAt: -1 //Sort by Date Added DESC
    }}).exec(function(error, documents) {
        if(documents.length > 0) {
            responseData.data = documents;
            responseData.success = true;
        }

        response.json(responseData);
    });
});

transactionRoutes.post('/transaction/add', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    if(!isEmpty(request.user)) {
        if (request.body.customerName != '') {
            let transaction = {
                createdAt: new Date().getTime(),
                customerName: request.body.customerName,
                userId: request.user._id,
                amount: request.body.amount,
                transactionType: request.body.transactionType,
                description: request.body.description
            };

            Transaction.create(transaction, (error, document) => {
                if (error) {
                    responseData.errors.push({type: 'critical', message: error});
                } else {
                    let transactionId = document._id;
                    if (transactionId) {
                        responseData.data.transactionId = transactionId;
                        responseData.success = true;
                    } else {
                        responseData.errors.push({type: 'default', message: 'Please try again.'});
                    }
                }

                response.json(responseData);
            });
        } else {
            responseData.errors.push({type: 'warning', message: 'Please enter customer Name.'});

            response.json(responseData);
        }
    } else {
        responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to enter payment.'});

        response.json(responseData);
    }
});

// Get Distinct Customer Names (/customers)
transactionRoutes.get('/customers/:searchText', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };
    // console.log('request at backend', request.params.searchText);
    let searchString = request.params.searchText;
    let customerName = "/" + searchString + "/";
    // console.log('=========',customerName);
    Transaction.collection.distinct("customerName", {"customerName": {'$regex' : '.*' + searchString + '.*'} },function(error, documents){
      if(documents.length > 0) {
          responseData.data = documents;
          responseData.success = true;
      }
      response.json(responseData);
    });
});




// Get Transaction BASED ON FILTERS
transactionRoutes.get('/filters/:date/:transactionType/:customerName', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };
    let customerName = request.params.customerName;
    let transactionType = request.params.transactionType;
    let date = request.params.date;
    var paymentDate = new Date(Number(date));
    // console.log('payment date', date);
    var month = paymentDate.getMonth();
    var year = paymentDate.getFullYear();
    var day = paymentDate.getDate();
    var todaysDate = new Date(Number(year), Number(month), Number(day));
    // console.log('date',todaysDate);
    var duration = 24*60*60*1000;
    var dateTomm = Number(todaysDate.getTime()) + Number(duration);
    transactionType = (Number(transactionType)-1).toString();
    // console.log('transaction type',transactionType);
    // console.log(todaysDate.getTime(), dateTomm);
    Transaction.find({ "customerName":  customerName,"createdAt":{"$gte": todaysDate.getTime(), "$lte":dateTomm}, "transactionType": transactionType },function(error, documents){
      // console.log('document',documents);
      responseData.success = false;
      if(typeof documents !== 'undefined' && documents.length > 0) {
          responseData.data = documents;
          responseData.success = true;
      }
      response.json(responseData);
    });
});






// Export
module.exports = transactionRoutes;

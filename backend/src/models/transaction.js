// src / models / user.js
'use strict';

const mongoose = require('mongoose');

// User Collection
let TransactionSchema = mongoose.Schema({
    customerName: String,
    amount: Number,
    userId: String,
    transactionType: String,
    description: String,
    createdAt: Number
});

let Transaction = mongoose.model('transactions', TransactionSchema);

module.exports = Transaction;

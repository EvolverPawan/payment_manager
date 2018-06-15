// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

// UI Imports
import { Card, CardTitle} from 'material-ui/Card';
import TextField from "material-ui/TextField";
import {orange500, blue500} from 'material-ui/styles/colors';

function TransactionList({ transactions }) {
    const emptyMessage = (
        <p>No transactions to show.</p>
    );

    const transactionsList = (
        transactions.map(({ _id, customerName, amount,description,transactionType,createdAt }) => (
            <Card key={ _id }>
                  <CardTitle title={ customerName } subtitle={ moment(new Date(createdAt)).fromNow() } />
                  <TextField value={amount}  />
                  <TextField errorStyle={styles.errorStyle} value={description}  />
                  <TextField  value={transactionType}  />
            </Card>

        ))
    );

    return (
        <div>
            { transactions.length === 0 ? emptyMessage : transactionsList }
        </div>
    );
}

TransactionList.propTypes = {
    transactions: PropTypes.array.isRequired
};
const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};
export default TransactionList;

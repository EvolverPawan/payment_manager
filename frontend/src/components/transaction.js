// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TransactionItem from './transactionItem'

// App Imports
import { fetchTransactions } from '../actions/transaction';

class Transaction extends Component {

  componentDidMount() {
      this.props.fetchTransactions();
  }

    render() {
      console.log('loading status', this.props.transactions);

      // if(this.props.transactions.list[0] == undefined){}else{console.log('transactions',this.props.transactions.list[0].customerName)}

        return (
          <section>
              <h2> Recent Transactions</h2>
              <br/>
                { typeof(this.props.transactions.list[0]) === "object" ?  <TransactionItem transactions={this.props.transactions.list } /> : <div>loading </div> }
              <br/>
          </section>
        )
    }
}

// export default Transaction;

Transaction.propTypes = {
    transactions: PropTypes.object.isRequired,
    fetchTransactions: PropTypes.func.isRequired
};

function transactionsState(state) {
    return {
        transactions: state.transactions
    }
}

export default connect(transactionsState, { fetchTransactions })(Transaction);

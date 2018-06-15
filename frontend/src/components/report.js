// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {DropDownMenu,MenuItem} from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, red500 } from 'material-ui/styles/colors';
import { fetchFilteredTransactions , getDistinctCustomers} from '../actions/transaction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TransactionsList from './TransactionsList.js'


// import FlatButton from 'material-ui/FlatButton';
class Report extends Component {
  constructor(props) {
      super(props);

      this.state = {
        transactionType:'all',
        search_api_response:false,
        dataSource:[],
        controlledDate: null,
        customerName:'',
        transactionsFound:false,
        transactions:[]
      };
  }
  handleDateChange = (event, date) => {
     this.setState({
       controlledDate: date,
     });
   };

  handleUpdateInput = (value) => {
    let stringCount = typeof value;
    // console.log('value', value.length);
    this.setState({
      customerName:value,
    });
    // let searchObj = {"searchText":value}
    if(value.length > 0){
    this.props.getDistinctCustomers(value).then((response) => {
      this.setState({ search_api_response: true});
      // console.log('search respnse', response);
      if(response.success) {
        // console.log(response);
        this.setState({
          dataSource:response.data,
        });
          // this.setState({ isLoading: false, notification: true, text: '', error: '', tweetId: response.data.tweetId });
      } else {
          // this.setState({ isLoading: false, error: response.errors[0].message });
          console.log('error', response);
      }
    });}
 };

  onChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
  }


  onResetDate(){
    // console.log('onresetdate');
    this.setState({
      customerName:'',
      transactionType:'all',
      search_api_response:false,
      dataSource:[],
      controlledDate: null
    });
  }
  onSubmit(event) {
      event.preventDefault();

      let input = {};
      input.customerName = this.state.customerName;

      if(input.transactionType !=='' && input.customerName !=='') {
          this.setState({ isLoggingIn: true, isLoading: true});
          var dateTimeStamp = new Date(this.state.controlledDate);
          input.date = dateTimeStamp.getTime();
          input.transactionType = this.state.transactionType;
          this.props.fetchFilteredTransactions(input).then((response) => {
            console.log('response filter',response);
            this.setState({ api_response: true});
            if(response.success) {
                this.setState({ transactionsFound: true, transactions:response.data});
            } else {
                this.setState({ transactionsFound: false });
            }
          });
      } else {
        console.log('error');
          this.setState({
              error: 'Please enter your username and password.',
              notification: false
          });
      }
  }

handleChange = (event, index, transactionType) => this.setState({transactionType});

  render() {
    var showTransactions = this.state.transactionsFound;
        return (
          <div>
          <form id="add_transaction" onSubmit={ this.onSubmit.bind(this)}>
            <AutoComplete
             hintText="customerName"
             dataSource={this.state.dataSource}
             onUpdateInput={this.handleUpdateInput}
            />

            <DropDownMenu value={this.state.transactionType} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="all" />
                <MenuItem value={2} primaryText="Credit" />
                <MenuItem value={3} primaryText="Debit" />
            </DropDownMenu>

            <DatePicker
             hintText="Date of Payment"
             value={this.state.controlledDate}
             onChange={this.handleDateChange}
             />

             <RaisedButton label="Reset Date" onClick  = {this.onResetDate.bind(this)} backgroundColor={ blue500 } labelColor="white" />
             <br/>
             <br/>
             <RaisedButton label="Submit" type="submit" backgroundColor={ blue500 } labelColor="white" />
          </form>
          { showTransactions
               ? <TransactionsList test = {this.state.transactions}></TransactionsList>
               :<div/>
           }

          </div>
        )
    }
}
const styles = {
  customWidth: {
    width: 200,
  },
};
Report.propTypes = {
    getDistinctCustomers: PropTypes.func.isRequired,
    fetchFilteredTransactions: PropTypes.func.isRequired,

};

export default connect(null, { getDistinctCustomers, fetchFilteredTransactions })(Report);
// export default Report;

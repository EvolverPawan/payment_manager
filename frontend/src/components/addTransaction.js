// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {DropDownMenu,MenuItem} from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, red500 } from 'material-ui/styles/colors';
import { postTransaction , getDistinctCustomers} from '../actions/transaction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';

// import FlatButton from 'material-ui/FlatButton';
class AddTransaction extends Component {
  constructor(props) {
      super(props);

      this.state = {
        transactionType:'Credit',
        customerName: '',
        description: '',
        amount:'',
        api_response: false,
        search_api_response:false,
        dataSource:[]
      };
  }

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
        console.log(response);
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
  onSubmit(event) {
      event.preventDefault();

      let input = {};
      input.transactionType = this.state.transactionType;
      input.customerName = this.state.customerName;
      input.description = this.state.description;
      input.amount = this.state.amount;

      if(input.transactionType !=='' && input.customerName !=='') {
          this.setState({ isLoggingIn: true, isLoading: true});

          this.props.postTransaction(input).then((response) => {
            // console.log('lllllllll',response);
            this.setState({ api_response: true});
            if(response.success) {
              // console.log(response);

                // this.setState({ isLoading: false, notification: true, text: '', error: '', tweetId: response.data.tweetId });
            } else {
                this.setState({ isLoading: false, error: response.errors[0].message });
            }
          });
      } else {
        // console.log('error');
          this.setState({
              error: 'Please enter your username and password.',
              notification: false
          });
      }
  }

  handleChange = (event, index, transactionType) => this.setState({transactionType});


  render() {
        return (
          <form id="add_transaction" onSubmit={ this.onSubmit.bind(this)}>
            <AutoComplete
             hintText="customerName"
             onChange={ this.onChange.bind(this) }
             dataSource={this.state.dataSource}
             onUpdateInput={this.handleUpdateInput}
            />
            <br/>
            <br/>


            <TextField
                type = "number"
                name="amount"
                value={ this.state.amount }
                onChange={ this.onChange.bind(this) }
                floatingLabelText="Amount"
                fullWidth={ true }
            />
            <br/>
            <br/>


            <DropDownMenu value={this.state.transactionType} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Credit" />
                <MenuItem value={2} primaryText="Debit" />
            </DropDownMenu>
            <br/>
            <br/>



            <TextField
                onChange={ this.onChange.bind(this) }
                name="description"
                value={ this.state.description }
                floatingLabelText="description"
                fullWidth={ true }
            />
            <RaisedButton label="Submit" type="submit" backgroundColor={ blue500 } labelColor="white" />
            { this.state.api_response ? <Redirect to={ `/transaction` } /> : '' }
          </form>

        )
    }
}
const styles = {
  customWidth: {
    width: 200,
  },
};
AddTransaction.propTypes = {
    postTransaction: PropTypes.func.isRequired,
    getDistinctCustomers: PropTypes.func.isRequired

};

export default connect(null, { postTransaction, getDistinctCustomers })(AddTransaction);
// export default AddTransaction;

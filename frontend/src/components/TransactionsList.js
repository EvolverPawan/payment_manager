import React, { Component } from 'react';
import { Card, CardTitle} from 'material-ui/Card';
import moment from 'moment';
import TextField from "material-ui/TextField";
import {orange500, blue500} from 'material-ui/styles/colors';

class TransactionsList extends Component{
  render() {
    const emptyMessage = (
        <p>No transactions to show.</p>
    );
    // var payments = this.props.test.map(function(obj, index){
    //           return (<li key={index}>{obj}</li>);
    //     });
    // const cardsArray = this.props.test.map(robot => (
    //   <Card
    //     name={robot.description}
    //     id={robot._id} />
    // ));
    const cardsArray = (
        this.props.test.map(({ _id, customerName, amount,description,transactionType,createdAt }) => (
            <Card key={ _id }>
                  <CardTitle title={ customerName } subtitle={ moment(new Date(createdAt)).fromNow() } />
                  <TextField value={amount}  />
                  <TextField errorStyle={styles.errorStyle} value={description}  />
                  <TextField  value={transactionType}  />
            </Card>

        ))
    );
    // console.log('TransactionsList',this.props.test );
    return (
      <div>
          { this.props.test.length === 0 ? emptyMessage : cardsArray }
      </div>
    );
   }

}
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


export default TransactionsList;

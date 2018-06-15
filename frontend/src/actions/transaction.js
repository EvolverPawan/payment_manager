// App Imports
import config from '../config';

export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const FETCH_TRANSACTIONS_BEGIN = 'FETCH_TRANSACTIONS_BEGIN';
export const SET_FILTERED_TRANSACTIONS = 'SET_FILTERED_TRANSACTIONS';
// export const SET_TWEET = 'SET_TWEET';
// export const FETCH_TWEET_BEGIN = 'FETCH_TWEET_BEGIN';

export function fetchTransactions() {
    return dispatch => {
        dispatch({
            type: FETCH_TRANSACTIONS_BEGIN
        });

        return fetch(`${ config.url.api }transactions`).then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                    if(response.data.length > 0) {
                        dispatch({
                            type: SET_TRANSACTIONS,
                            transactions: response.data
                        });
                    }
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", response.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}

export function fetchFilteredTransactions(filters) {
  const token = localStorage.getItem('token');

    return dispatch => {
        // dispatch({
        //     type: FETCH_TRANSACTIONS_BEGIN
        // });

        return fetch(`${ config.url.api }filters/${filters.date}/${filters.transactionType}/${filters.customerName}`,{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(response => response.json());
        // .then(function(response) {
        //   console.log('response',response);
        //     if (response.ok) {
        //         response.json().then(function(response) {
        //             if(response.data.length > 0) {
        //               response.success = true;
        //                 dispatch({
        //                     type: SET_TRANSACTIONS,
        //                     transactions: response.data
        //                 });
        //             }
        //         });
        //     } else {
        //         console.log("Looks like the response wasn't perfect, got status", response.status);
        //     }
        // }, function(e) {
        //     console.log("Fetch failed!", e);
        // });
    }
}



export function postTransaction(transaction) {
    const token = localStorage.getItem('token');

    return dispatch => {
        return fetch(`${ config.url.api }transaction/add`, {
            method: 'post',

            body: JSON.stringify(transaction),

            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
            .then(response => response.json())
    }
}







export function getDistinctCustomers(searchText) {
    const token = localStorage.getItem('token');
    console.log('searchText1',searchText);
    return dispatch => {
        return fetch(`${ config.url.api }customers/${searchText}`, {
            method: 'get',

            // body: JSON.stringify(searchText),

            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
          .then(response => response.json())
    }
}

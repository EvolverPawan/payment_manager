// Imports
import { combineReducers } from 'redux';

// App Imports
import user from './user';
import { transactions } from './transaction';

export default combineReducers({
    user,
    transactions
});

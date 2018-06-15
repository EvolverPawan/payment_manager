// Imports
import update from 'immutability-helper';

// App Imports
import { FETCH_TRANSACTIONS_BEGIN, SET_TRANSACTIONS} from '../actions/transaction';

export function transactions(state = { list: [], error: false, loading: false }, action = {}) {
    switch(action.type) {

        case FETCH_TRANSACTIONS_BEGIN:
            return update(state, { $merge: {
                list: [],
                error: false,
                loading: true
            }});

        case SET_TRANSACTIONS:
            return update(state, { $merge: {
                list: action.transactions,
                error: false,
                loading: false
            }});

        default:
            return state;
    }
}

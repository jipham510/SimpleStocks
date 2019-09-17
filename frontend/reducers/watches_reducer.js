import { RECEIVE_WATCHED_STOCKS, RECEIVE_WATCHED_STOCK, REMOVE_WATCHED_STOCK } from '../actions/watch_actions';
import merge from "lodash/merge";

const watchReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WATCHED_STOCKS:
            return action.watchedStocks;
        case RECEIVE_WATCHED_STOCK:
            return merge({}, state, action.watchedStock);
        case REMOVE_WATCHED_STOCK:
            let newState = merge({},state);
            delete newState[action.ticker];
            return newState;
        default:
            return state;
    }
}
export default watchReducer;

// return Object.assign({}, state, { [action.user.id]: action.user }); import { RECEIVE_WATCHED_STOCKS } from '../actions/watch_actions'

//         case RECEIVE_CURRENT_USER:
// return Object.assign({}, { id: action.user.id })
//         case LOGOUT_CURRENT_USER:
// return _nullSession;
//         default:
// return state;
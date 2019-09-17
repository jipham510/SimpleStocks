import { RECEIVE_WATCHED_STOCKS } from '../actions/watch_actions'
const watchReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WATCHED_STOCKS:
            return action.watchedStocks
        default:
            return state;
    }
}
export default watchReducer;

// return Object.assign({}, state, { [action.user.id]: action.user }); import { RECEIVE_WATCHED_STOCKS } from '../actions/watch_actions'


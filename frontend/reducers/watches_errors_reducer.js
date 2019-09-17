import { RECEIVE_WATCHED_STOCKS, RECEIVE_WATCHES_ERRORS } from '../actions/watch_actions'

const watchesErrorReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WATCHED_STOCKS:
            return [];
        case RECEIVE_WATCHES_ERRORS:
            return action.errors;
        // case CLEAR_WATCHES_ERRORS:
        //     return [];
        default:
            return state;
    }
};

export default watchesErrorReducer;


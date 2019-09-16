import { RECEIVE_ORDER, RECEIVE_ORDER_ERRORS, CLEAR_ORDER_ERRORS } from '../actions/order_actions'

const ordersErrorReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ORDER:
            return [];
        case RECEIVE_ORDER_ERRORS:
            return action.errors;
        case CLEAR_ORDER_ERRORS:
            return [];
        default:
            return state;
    }
};

export default ordersErrorReducer;


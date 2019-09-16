import * as APIOrderUtil from '../util/order_api_util';

export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_ORDER_ERRORS = "RECEIVE_ORDER_ERRORS";
export const CLEAR_ORDER_ERRORS = "CLEAR_ORDER_ERRORS"
const receiveOrder = (order) => ({
    type: RECEIVE_ORDER,
    order
})

const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ORDER_ERRORS,
        errors,
    }
};
export const clearErrors = () => {
    return {
        type: CLEAR_ORDER_ERRORS,
    }
};

export const postOrder = (formOrder) => (dispatch) => APIOrderUtil.postOrder(formOrder)
    .then( order => dispatch(receiveOrder(order)),
        err => dispatch(receiveErrors(err.responseJSON)));


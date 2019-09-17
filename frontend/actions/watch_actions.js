import * as APIWatchUtil from '../util/watch_api_util';

export const RECEIVE_WATCHED_STOCKS = "RECEIVE_WATCHED_STOCKS";
export const RECEIVE_WATCHES_ERRORS = "RECEIVE_WATCHES_ERRORS";

const receiveWatchedStocks = (watchedStocks) => {
    return {
        type: RECEIVE_WATCHED_STOCKS,
        watchedStocks
    }
}
const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ORDER_ERRORS,
        errors,
    }
};

export const fetchWatchedStocks = () => (dispatch) => APIWatchUtil.fetchWatchedStocks()
    .then(watchedStocks => dispatch(receiveWatchedStocks(watchedStocks)),
        err => dispatch(receiveErrors(err.responseJSON)));


        
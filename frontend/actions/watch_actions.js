import * as APIWatchUtil from '../util/watch_api_util';

export const RECEIVE_WATCHED_STOCKS = "RECEIVE_WATCHED_STOCKS";
export const RECEIVE_WATCHED_STOCK = "RECEIVE_WATCHED_STOCK";
export const RECEIVE_WATCHES_ERRORS = "RECEIVE_WATCHES_ERRORS";
export const REMOVE_WATCHED_STOCK = "REMOVE_WATCHED_STOCK";

const receiveWatchedStocks = (watchedStocks) => {
    return {
        type: RECEIVE_WATCHED_STOCKS,
        watchedStocks
    }
}
const receiveWatchedStock = (watchedStock) => {
    return {
        type: RECEIVE_WATCHED_STOCK,
        watchedStock
    }
}
const removeWatchedStock = (watchedStock,ticker) => ({
    type: REMOVE_WATCHED_STOCK,
    watchedStock,
    ticker
});
const receiveErrors = (errors) => {
    return {
        type: RECEIVE_WATCHES_ERRORS,
        errors,
    }
};

export const fetchWatchedStocks = () => (dispatch) => APIWatchUtil.fetchWatchedStocks()
    .then(watchedStocks => dispatch(receiveWatchedStocks(watchedStocks)),
        err => dispatch(receiveErrors(err.responseJSON)));
export const postWatchedStock = (stock) => (dispatch) => APIWatchUtil.postWatchedStock(stock)
    .then(watchedStock => dispatch(receiveWatchedStock(watchedStock)),
        err => dispatch(receiveErrors(err.responseJSON)));
export const deleteWatchedStock = (watchId,ticker) => (dispatch) => APIWatchUtil.deleteWatchedStock(watchId)
    .then(watchedStock => dispatch(removeWatchedStock(watchedStock,ticker)),
        err => dispatch(receiveErrors(err.responseJSON)));


        
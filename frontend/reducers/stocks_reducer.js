import { RECEIVE_STOCK, RECEIVE_STOCKS, RECEIVE_COMPANY_INFO, RECEIVE_STOCK_STATS, RECEIVE_STOCK_CHART } from '../actions/stock_actions';
import merge from "lodash/merge";
const stockReducer = ( state={},action) => {
    Object.freeze(state);
    let newStockState;
    switch(action.type) {
        case RECEIVE_STOCK:
            let new_stock = { 
                ticker: action.stock.symbol,
                name: action.stock.companyName
            }
            return merge({}, state, { [new_stock.ticker]: new_stock })
        case RECEIVE_STOCKS:
            return merge({}, action.stocks);
        case RECEIVE_COMPANY_INFO:
            newStockState = merge({}, state, { [action.ticker]: action.company_info});
            return newStockState;
        case RECEIVE_STOCK_STATS:
            newStockState = merge({}, state, { [action.ticker]: action.stats});
            return newStockState;
        case RECEIVE_STOCK_CHART:
            let chart = { chart: action.chart };
            newStockState = merge({}, state, { [action.ticker]: chart });
            return newStockState;
        default: 
            return state;
    }
}
export default stockReducer;
// return Object.assign({}, state, { [action.ticker]: action.company_data });

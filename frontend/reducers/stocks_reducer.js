import { RECEIVE_STOCK, RECEIVE_STOCKS, RECEIVE_COMPANY_INFO, RECEIVE_STOCK_STATS, RECEIVE_STOCK_CHART, RECEIVE_LATEST_STOCK_PRICE, RECEIVE_HISTORICAL_DATA, RECEIVE_INTRADAY_DATA } from '../actions/stock_actions';
import merge from "lodash/merge";
const stockReducer = ( state={},action) => {
    Object.freeze(state);
    let newStockState;
    switch(action.type) {
        case RECEIVE_STOCK:
            return merge({}, state, { [action.stock.ticker]: action.stock });
        case RECEIVE_LATEST_STOCK_PRICE:
            return merge({}, state, { [action.stock.ticker]: action.stock })
        case RECEIVE_STOCKS:
            return merge({}, state, action.stocks);
        case RECEIVE_COMPANY_INFO:
            newStockState = merge({}, state, { [action.ticker]: action.company_info});
            return newStockState;
        case RECEIVE_STOCK_STATS:
            newStockState = merge({}, state, { [action.ticker]: action.stats});
            return newStockState;
        case RECEIVE_STOCK_CHART:
            let chartData = { chartData: action.chartData };
            newStockState = merge({}, state, { [action.ticker]: chartData });
            return newStockState;
        case RECEIVE_INTRADAY_DATA:
            let intradayData = { intradayData: action.intradayData };
            newStockState = merge({}, state, { [action.ticker]: intradayData });
            return newStockState;
        case RECEIVE_HISTORICAL_DATA:
            let historicalData = { historicalData: action.historicalData };
            newStockState = merge({}, state, { [action.ticker]: historicalData });
            return newStockState;
        default: 
            return state;
    }
}
export default stockReducer;
// return Object.assign({}, state, { [action.ticker]: action.company_data });

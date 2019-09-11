import { RECEIVE_STOCK, RECEIVE_STOCKS } from '../actions/stock_actions'

const stockReducer = ( state={},action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_STOCK:
            let new_stock = { 
                ticker: action.stock.symbol,
                name: action.stock.companyName
            }
            return Object.assign({}, state, { [new_stock.ticker]: new_stock })
        case RECEIVE_STOCKS:
            return Object.assign({}, action.stocks);
        default: 
            return state;
    }
}
export default stockReducer;

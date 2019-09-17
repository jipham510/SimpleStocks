import { connect } from 'react-redux';
import { fetchHistoricalData, fetchIntradayData} from '../../actions/stock_actions'
import Portfolio from './portfolio';

const mapStateToProps = (state, ownProps) => {
    let ownedShares = state.entities.users[state.session.id].ownedShares;
    let ownedStockTickers = Object.keys(ownedShares)

    let ownedStocksIntradayData = []; //array of intradata arrays
    // debugger
    // ownedStocks.forEach( stock => {
    //     if (stock.intradayData) ownedStocksIntradayData.push(stock.intradayData);
    // })
    return {
        ownedStocksIntradayData,
        ownedStockTickers
    }
};

const mapDispatchToProps = dispatch => ({
    // fetchHistoricalData: (ticker) => dispatch(fetchHistoricalData(ticker)),
    fetchIntradayData: (ticker) => dispatch(fetchIntradayData(ticker)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio);

import { connect } from 'react-redux';
import { fetchHistoricalData, fetchStock, fetchIntradayData } from '../../actions/stock_actions';
import Chart from './chart';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    const stockTicker = ownProps.match.params.ticker;
    let intradayData = [];
    let historicalData = [];
    let stock = state.entities.stocks[stockTicker]
    if (stock) {
        if (stock.intradayData) intradayData = stock.intradayData
        if (stock.historicalData) historicalData = stock.historicalData
    }
    return {
        ticker: stockTicker,
        historicalData,
        intradayData
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStock: (ticker) => dispatch(fetchStock(ticker)),
    fetchHistoricalData: (ticker) => dispatch(fetchHistoricalData(ticker)),
    // fetchIntradayData: (ticker) => dispatch(fetchIntradayData(ticker)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart));

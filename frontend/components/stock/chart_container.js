import { connect } from 'react-redux';
import { fetchStockChart, fetchHistoricalData } from '../../actions/stock_actions';
import Chart from './chart';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    const stockTicker = ownProps.match.params.ticker;
    return {
        ticker: stockTicker,
        // historicalData: state.entities.stocks[stockTicker].historicalData,
        // intradayData: state.entities.stocks[stockTicker].intradayData
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStockChart: (ticker, range) => dispatch(fetchStockChart(ticker,range)),
    fetchStock: (ticker) => dispatch(fetchStock(ticker)),
    fetchHistoricalData: (ticker) => dispatch(fetchHistoricalData(ticker)),
    fetchIntradayData: (ticker) => dispatch(fetchIntradayData(ticker)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart));

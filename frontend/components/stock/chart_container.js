import { connect } from 'react-redux';
import { fetchStockChart } from '../../actions/stock_actions';
import Chart from './chart';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    const stockTicker = ownProps.match.params.ticker;
    return {
        ticker: stockTicker
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStockChart: (ticker, range) => dispatch(fetchStockChart(ticker,range)),
    fetchStock: (ticker) => dispatch(fetchStock(ticker))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart));

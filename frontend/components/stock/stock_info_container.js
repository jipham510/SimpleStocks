import { connect } from 'react-redux';
import { fetchCompanyInfo, fetchStockStats } from '../../actions/stock_actions';
import StockInfo from './stock_info';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    const stockTicker = ownProps.match.params.ticker;
    return {
        ticker: stockTicker
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyInfo: (ticker) => dispatch(fetchCompanyInfo(ticker)),
    fetchStockStats: (ticker) => dispatch(fetchStockStats(ticker)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StockInfo));

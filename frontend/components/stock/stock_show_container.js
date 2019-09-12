import { connect } from 'react-redux';
import { fetchCompanyInfo, fetchStock } from '../../actions/stock_actions';
import StockShow from './stock_show';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state,ownProps) => {
    let stockTicker = ownProps.match.params.ticker;
    let stock;
    if (state.entities.stocks[stockTicker]) {
        stock = state.entities.stocks[stockTicker];
        // debugger
    } else {
        stock = {
            name: "",
            ticker: ""
        };
        // debugger
    }
    return {
        stock: stock
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyInfo: (ticker) => dispatch(fetchCompanyInfo(ticker)),
    fetchStock: (ticker) => dispatch(fetchStock(ticker)),
    fetchStockStats: (ticker) => dispatch(fetchStockStats(ticker)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StockShow));

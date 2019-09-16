import { connect } from 'react-redux';
import { fetchLatestStockPrice } from '../../actions/stock_actions';
import StockIndexItem from './stock_index_item';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    let stock = state.entities.stocks[ownProps.stock.ticker];
    let price
    if (stock) price = stock.price;
    return {
        stock: ownProps.stock,
        price
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLatestStockPrice: (ticker) => dispatch(fetchLatestStockPrice(ticker))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockIndexItem);

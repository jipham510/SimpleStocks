import { connect } from 'react-redux';
import { fetchStockChart } from '../../actions/stock_actions';
import StockIndexItem from './stock_index_item';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return {
        stock: ownProps.stock
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLatestStockPrice: (ticker) => dispatch(fetchLatestStockPrice(ticker))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockIndexItem);

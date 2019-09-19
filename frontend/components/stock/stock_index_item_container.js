import { connect } from 'react-redux';
import { fetchLatestStockPrice, fetchIntradayData } from '../../actions/stock_actions';
import StockIndexItem from './stock_index_item';

const mapStateToProps = (state, ownProps) => {
    let stock = state.entities.stocks[ownProps.stock.ticker];

    let intradayData;

    if(stock && stock.intradayData) {
        intradayData = stock.intradayData
    }
    return {
        stock: ownProps.stock,
        intradayData
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLatestStockPrice: (ticker) => dispatch(fetchLatestStockPrice(ticker)),
    fetchIntradayData: (ticker) => dispatch(fetchIntradayData(ticker)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockIndexItem);

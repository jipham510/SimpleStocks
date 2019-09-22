import { connect } from 'react-redux';
import StockShow from './stock_show';
import { withRouter } from 'react-router-dom';
import { fetchIntradayData } from '../../actions/stock_actions';


const mapStateToProps = (state,ownProps) => {
    const stockTicker = ownProps.match.params.ticker;
    let stock = state.entities.stocks[stockTicker]
    let intradayData = [];
    if (stock && stock.intradayData) {
        intradayData = stock.intradayData
    }
    return {
        ticker: stockTicker, 
        stock,
        intradayData
    }
}
const mapDispatchToProps = dispatch => ({
    fetchIntradayData: (ticker) => dispatch(fetchIntradayData(ticker)),

});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StockShow));

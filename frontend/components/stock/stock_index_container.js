import { connect } from 'react-redux';
import { fetchStocks } from '../../actions/stock_actions';
import StocksIndex from './stock_index';

const mapStateToProps = (state) => {
    let stocks = Object.values(state.entities.stocks);
    return {
        stocks: stocks
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StocksIndex);

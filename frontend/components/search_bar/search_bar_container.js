import { connect } from 'react-redux';
import { fetchStocks } from '../../actions/stock_actions';
import SearchBar from './search_bar';

const mapStateToProps = (state, ownProps) => {
    // let stocks = Object.values(state.entities.stocks);
    return {
        stocks: state.entities.stocks.allStocks
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);

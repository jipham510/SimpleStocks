import { connect } from 'react-redux';
import { fetchStockChart } from '../../actions/stock_actions';
import SearchBar from './search_bar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    const stocks = [];
    return {
        stocks: stocks
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStockChart: (ticker, range) => dispatch(fetchStockChart(ticker,range))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar));

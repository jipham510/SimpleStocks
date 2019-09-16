import { connect } from 'react-redux';
import { fetchStocks } from '../../actions/stock_actions';
import StocksIndex from './stock_index';

const mapStateToProps = (state) => {
    let ownedShares = state.entities.users[state.session.id].ownedShares;
    let stocks = Object.keys(ownedShares).map( ticker => ({ticker: ticker, shares: ownedShares[ticker]}))
    return {
        stocks
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StocksIndex);

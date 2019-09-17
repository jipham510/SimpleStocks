import { connect } from 'react-redux';
import { fetchWatchedStocks } from '../../actions/watch_actions';
import StocksIndex from './stock_index';

const mapStateToProps = (state) => {
    let ownedShares = state.entities.users[state.session.id].ownedShares;
    let ownedStocks = Object.keys(ownedShares).map( ticker => ({ticker: ticker, shares: ownedShares[ticker]}))

    let watchedStocks = []
    if (state.entities.watches.hasOwnProperty('watchedStocks')) watchedStocks = state.entities.watches.watchedStocks;
    return {
        ownedStocks,
        watchedStocks
    }
}

const mapDispatchToProps = dispatch => ({
    fetchWatchedStocks: () => dispatch(fetchWatchedStocks()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StocksIndex);

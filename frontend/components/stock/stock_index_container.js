import { connect } from 'react-redux';
import StocksIndex from './stock_index';
import { fetchWatchedStocks} from '../../actions/watch_actions'
const mapStateToProps = (state) => {
    let ownedShares = state.entities.users[state.session.id].ownedShares;
    let ownedStocks = Object.keys(ownedShares).map( ticker => ({ticker: ticker, shares: ownedShares[ticker]}))
    
    let watchedStocks = Object.keys(state.entities.watches).map(ticker => ({ ticker: ticker}))
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

// watches:
// NFLX: { ticker: "NFLX", id: 22 }
// SBUX: { ticker: "SBUX", id: 23 }
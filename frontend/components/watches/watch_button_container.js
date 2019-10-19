import { connect } from 'react-redux';
import { fetchWatchedStocks, postWatchedStock, deleteWatchedStock } from '../../actions/watch_actions';

import WatchButton from './watch_button';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {

    return {
        ticker: ownProps.ticker,
        watches: state.entities.watches
    }
};

const mapDispatchToProps = dispatch => ({
    postWatchedStock: (watch) => dispatch(postWatchedStock(watch)),
    deleteWatchedStock: (watchId,ticker) => dispatch(deleteWatchedStock(watchId,ticker)),
    fetchWatchedStocks: () => dispatch(fetchWatchedStocks())
    
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(WatchButton));

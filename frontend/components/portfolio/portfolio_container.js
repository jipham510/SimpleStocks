import { connect } from 'react-redux';
import { fetchHistoricalData, fetchIntradayData} from '../../actions/stock_actions'
import Portfolio from './portfolio';

const mapStateToProps = (state, ownProps) => {

    let currentBalance = state.entities.users[state.session.id].currentBalance;
    return {
        currentBalance
    }
};

const mapDispatchToProps = dispatch => ({
    fetchIntradayData: (ticker) => dispatch(fetchIntradayData(ticker)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio);

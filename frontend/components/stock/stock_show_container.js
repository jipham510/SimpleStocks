import { connect } from 'react-redux';
import StockShow from './stock_show';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state,ownProps) => {
    const stockTicker = ownProps.match.params.ticker;
    return {
        ticker: stockTicker
    }
}
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StockShow));

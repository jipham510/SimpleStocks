import { connect } from 'react-redux';
import { postOrder, clearErrors } from '../../../actions/order_actions';
import OrderForm from './order_form';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    const stock = state.entities.stocks[ownProps.ticker];
    const buyingPower = state.entities.users[state.session.id].buyingPower;
    const ownedShares = state.entities.users[state.session.id].ownedShares[ownProps.ticker];
    return {
        errors: state.errors.orders,
        stock,
        ticker: ownProps.ticker,
        buyingPower,
        ownedShares
    }
};

const mapDispatchToProps = dispatch => ({
    postOrder: (formOrder) => dispatch(postOrder(formOrder)),
    clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderForm));

import { connect } from 'react-redux';
import { postOrder, clearErrors } from '../../../actions/order_actions';
import OrderForm from './order_form';

const mapStateToProps = (state, ownProps) => {
    const stock = state.entities.stocks[ownProps.ticker];
    // debugger
    return {
        errors: state.errors.orders,
        stock,
        ticker: ownProps.ticker
    }
};

const mapDispatchToProps = dispatch => ({
    postOrder: (formOrder) => dispatch(postOrder(formOrder)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderForm);

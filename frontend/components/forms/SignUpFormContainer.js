import { connect } from 'react-redux';
import { createNewUser, clearErrors } from '../../actions/session_actions';
import SignUpForm from './SignUpForm';

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(createNewUser(user)),
    clearErrors: () => dispatch(clearErrors()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);

import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session_actions';
import SignUpForm from './SignUpForm';

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors.session,
    formType: 'signup'
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(createNewUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);

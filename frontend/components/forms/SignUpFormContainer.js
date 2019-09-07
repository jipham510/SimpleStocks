import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session_actions';
import SessionForm from './SessionForm';

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
)(SessionForm);

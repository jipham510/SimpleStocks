import { connect } from 'react-redux';
import { login, clearErrors} from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session
    }
};

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

import { connect } from 'react-redux';
import Home from './home';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id]
});

export default connect(mapStateToProps, null)(Home)
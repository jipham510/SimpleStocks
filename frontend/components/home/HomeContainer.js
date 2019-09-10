import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id]
});

export default connect(mapStateToProps, null)(Home)
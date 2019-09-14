import { connect } from 'react-redux';
import { fetchNews, fetchCompanyNews } from '../../actions/news_actions';
import NewsIndex from './news_index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return {
        news: state.entities.news
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    fetchCompanyNews: (company) => dispatch(fetchCompanyNews(company)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsIndex);

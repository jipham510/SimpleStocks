import { connect } from 'react-redux';
import { fetchNews, fetchCompanyNews } from '../../actions/news_actions';
import NewsIndex from './news_index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    let stockName = "NONE";
    if (ownProps.match.params.hasOwnProperty("ticker")){
        let ticker = ownProps.match.params.ticker;
        if (state.entities.stocks[ticker]) {
            stockName = state.entities.stocks[ticker].name;
        }
    }
    return {
        news: state.entities.news,
        stockName
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    fetchCompanyNews: (company) => dispatch(fetchCompanyNews(company)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsIndex));


import React from 'react';
import { withRouter } from 'react-router-dom';
import NewsIndexItem from './news_index_item';

class NewsIndex extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        let ticker = this.props.match.params.ticker;
        if (!this.props.match.params.hasOwnProperty("ticker")) {
            this.props.fetchNews()
        }
    }
    componentDidUpdate(prevProps) {
        if ( prevProps.stockName !== this.props.stockName && this.props.stockName !== "NONE") {
            this.props.fetchCompanyNews(this.props.stockName);
        }
    }
    render() {
        let news = this.props.news.filter ( article => article.urlToImage );
        news = news.slice(0,10);
        return (
            <div className="news-index">
                <h2>Recent News</h2>
                {news.map( (article,idx) => (
                    <NewsIndexItem article={article} key={idx} />
                ))}

                <a href="https://newsapi.org/"> 
                    <div className="credit-news-api">
                        Powered by News API
                    </div> 
                </a>
            </div>
        )
    }
}
export default NewsIndex;
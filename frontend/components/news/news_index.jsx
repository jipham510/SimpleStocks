
import React from 'react';
import { withRouter } from 'react-router-dom';
import NewsIndexItem from './news_index_item';

class NewsIndex extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        this.props.fetchNews()
    }
    render() {
        return (
            <div className="news-index">
                <h2>Recent News</h2>
                {this.props.news.map( (article,idx) => (
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
export default withRouter(NewsIndex);
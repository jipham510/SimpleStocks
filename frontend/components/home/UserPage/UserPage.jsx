import React from 'react';
import StockIndexContainer from '../../stock/stock_index_container';
import SearchBarContainer from '../../search_bar/search_bar_container'
import UserNavContainer from '../../nav/user_nav_container'
import NewsIndexContainer from '../../news/news_index_container'
class UserPage extends React.Component {

    render() {
        const { currentUser, logout } = this.props;
        return (
            <div className="home">
                <UserNavContainer />
                <div className="main-content">
                    <h1>Welcome to Simple Stocks</h1>
                    <div className="portfolio"> 
                        put zigzag lines here (aka portfolio)
                    </div>
                    <div className="newsfeed"> 
                        <NewsIndexContainer />
                    </div>
                </div>

                <div className="watchlist">
                <StockIndexContainer />
                </div>
            </div>
        )
    }
}

export default UserPage;


import React from 'react';
import StockIndexContainer from '../../stock/stock_index_container';
import UserNavContainer from '../../nav/user_nav_container'
import NewsIndexContainer from '../../news/news_index_container'
class UserPage extends React.Component {

    render() {
        return (
            <div className="home">
                <UserNavContainer />
                <div className="main-content">
                    <h1>Welcome to Simple Stocks</h1>
                    <div className="portfolio"> 
                        Placeholder for Portfolio
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


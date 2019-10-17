import React from 'react';
import StockIndexContainer from '../../stock/stock_index_container';
import UserNavContainer from '../../nav/user_nav_container';
import NewsIndexContainer from '../../news/news_index_container';
import PortfolioContainer from '../../portfolio/portfolio_container';
import Footer from '../footer';

class UserPage extends React.Component {

    render() {
        return (
            <div className="home">
                <UserNavContainer />
                <div className="main-content">
                    <PortfolioContainer />
                    <NewsIndexContainer />
                    <Footer />
                </div>

                <div className="watchlist">
                    <StockIndexContainer />
                </div>
            </div>
        )
    }
}

export default UserPage;


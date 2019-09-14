import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../../nav/nav_container';
import StockIndexContainer from '../../stock/stock_index_container';
import SearchBarContainer from '../../search_bar/search_bar_container'
import UserNavContainer from '../../nav/user_nav_container'
class UserPage extends React.Component {

    render() {
        const { currentUser, logout } = this.props;
        return (
            <div className="home">
                <UserNavContainer />
                <div className="portfolio"> 
                    <h1>Welcome to Simple Stocks</h1>
                    put zigzag lines here
                </div>
                <div className="newsfeed"> put newsfeed here</div>
                <div className="watchlist">
                <StockIndexContainer />
                </div>
            </div>
        )
    }
}

export default UserPage;


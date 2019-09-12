import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../../nav/nav_container';
import StockIndexContainer from '../../stock/stock_index_container';
import SeachBarContainer from '../../search_bar/search_bar_container'
class UserPage extends React.Component {

    render() {
        const { currentUser, logout } = this.props;
        return (
            <div className="home">

                <header className="user-page-header">
                    <NavContainer />
                    <SeachBarContainer />
                    <div className="home-menu">
                        <div className="home-logout">
                            <div onClick={logout} className="logout-btn">Log Out</div>
                        </div>
                    </div>
                </header>
                <div className="portfolio"> put zigzag lines here</div>
                <div className="newsfeed"> put newsfeed here</div>
                <div className="watchlist">
                <StockIndexContainer />
                </div>
            </div>
        )
    }
}

export default UserPage;


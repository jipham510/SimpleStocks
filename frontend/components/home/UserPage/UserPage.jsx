import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../../nav/nav_container';

class UserPage extends React.Component {

    render() {
        const { currentUser, logout } = this.props;
        return (
            <div className="home">
                <header>
                    <NavContainer />
                    <div className="searchbar"> 
                        {/* <input type="text" value="search stocks here"/> */}
                        <h4>search stocks here </h4>
                    </div>
                    <div className="home-menu">
                        <div className="home-logout">
                            <h1>Welcome {currentUser.username}</h1>
                            <button onClick={logout}>Log Out</button>
                        </div>
                    </div>
                </header>
                <div className="dashboard"> put zigzag lines here</div>
                <div className="newsfeed"> put newsfeed here</div>
                <div className="watchlist"> put watchlist here (how to scroll here?)</div>
            </div>
        )
    }
}

export default UserPage;


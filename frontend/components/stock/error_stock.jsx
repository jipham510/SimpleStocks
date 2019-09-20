import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserNavContainer from '../nav/user_nav_container'

const ErrorStock = (props) => {
    return (
        <div className="error-home">
            <UserNavContainer />
            <div className="doge-404">
                <div className="main-left-404">
                    <h1>Wow</h1>
                    <h2>Such 404</h2>

                    <h3>We couldn't find the page you were looking for.</h3>
                    <h3>It seems you may have taken a wrong turn.</h3>

                    <div className="error-home-btn">Go Home</div>
                </div>
            </div>
        </div>
        )
}

export default ErrorStock;


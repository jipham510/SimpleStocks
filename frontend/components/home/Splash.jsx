import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/nav_container'

const Splash = (props) => {
    return (
        <div className="splash">
            <NavContainer />
            <div className="front-page-wrapper">
                <div className="front-page__intro">
                    <div className="front-page__intro__cover"></div>
                    <div className="front-page__intro__text1">
                        <h1>Investing</h1>
                    </div>
                    <div className="front-page__intro__text2">
                        <h1>Made Simple</h1>
                    </div>
                    <br/>
                    <div className="front-page__intro__text3">
                        <h2> Practice investing in stocks</h2>
                        <h2> right from your phone or desktop.</h2>
                    </div>
                    <Link to="/signup">
                        <div className="sign-up">
                            <h4 className="sign-up-text">Sign Up</h4>
                        </div>
                    </Link>
                </div>
                <div className="front-page-pic-container">
                    <div className="front-page-pic"></div>
                </div>
            </div>
        </div>
    )
}

export default Splash;


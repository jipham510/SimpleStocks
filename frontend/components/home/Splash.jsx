import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/nav_container'

const Splash = (props) => {
    return (
        <div className="splash-wrapper">
            <header className="splash-nav">
                <NavContainer />
            </header>

            <div className="front-page-wrapper">
                <div className="front-page-intro">
                    <div className="cover"></div>
                    <div className="front-page-text1">
                        <h1>
                            Invest
                        </h1>
                    </div>
                    <div className="front-page-text2">
                        <h1>
                            Commission-Free
                        </h1>
                    </div>
                    <br/>
                    <div className="front-page-text3">
                        <h2> Invest in stocks, ETFs, options, and </h2>
                        <h2> cryptocurrencies, all commission-free, </h2> 
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


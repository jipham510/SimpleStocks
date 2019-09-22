import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserNavContainer from '../nav/user_nav_container'
class ErrorStock extends React.Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleHover(){
        let errorText = document.querySelector(".error-text");
            errorText.innerHTML = "So Home";
    }
    handleReset(){
        let errorText = document.querySelector(".error-text");
            errorText.innerHTML = "Go Home";
    }
    render(){
        return (
            <div className="error-home">
                <UserNavContainer />
                <div className="doge-404">
                    <div className="main-left-404" >
                        <h1>Wow</h1>
                        <h2>Such 404</h2>
                        <div className="error-body">
                            <h3>We couldn't find the stock you were looking for.</h3>
                            <h3>The stock market is also down for weekends and holidays</h3>
                        </div>

                        <div className="error-home-btn" onMouseEnter={this.handleHover} onMouseLeave={this.handleReset} onClick={() => this.props.history.push("/") }>
                            <h4 className="error-text">
                                Go Home
                            </h4>
                        </div>
                    </div>
                    <img src={window.dogeError} className="doge"/>
                </div>
            </div>
        )
    }
}

export default ErrorStock;


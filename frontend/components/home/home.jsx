import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    // render() {
    //     const { currentUser, logout } = this.props;
    //     if (currentUser) {
    //         return (
    //             <div>
    //                 <h1>Welcome {currentUser.username}</h1>
    //                 <button onClick={logout}>Log Out</button>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div>
    //                 <Link to="/signup"> signup </Link>
    //                 <Link to="/login"> login </Link>
    //                 <h1>greetings!</h1>
    //             </div>
    //         );
    //     }
    // }

    componentDidMount(){
        const logo = document.getElementById("logo");
        logo.addEventListener("click",()=>{
            const body = document.querySelector("body");
            if (body.getAttribute("data-theme")) {
                body.removeAttribute("data-theme")
            } else {
                body.setAttribute("data-theme","dark")
            }
        })
    }
    render() {
        const { currentUser, logout } = this.props;
        // debugger
        let placeholder;
        if (currentUser) {
            placeholder = (
                <div className="placeholder">
                    <h1>Welcome {currentUser.username}</h1>
                    <button onClick={logout}>Log Out</button>
                </div>
            )
        } else {
            placeholder = (
                <div className="placeholder">
                    <Link to="/signup"> signup </Link>
                    <Link to="/login"> login </Link>
                    <h1>greetings!</h1>
                </div>
            );
        }
        return (
            <div>
                <header>
                    <div id="logo"> 
                        <h4>SimpleStocks</h4>
                    </div>
                    <div className="icons">
                        <a href="#!" className="hoverlinks">
                            <i className="fas fa-envelope fa-2x"></i>
                        </a>
                        <a href="#!" className="hoverlinks">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                        <a href="#!" className="hoverlinks">
                            <i className="fab fa-github fa-2x"></i>
                        </a>
                    </div>
                    <div className="menu">

                        <div className="log-in"> <Link to="/login" className="hoverlinks"> Log in </Link></div>
                        <Link to="/signup"> <div className="sign-up"> <h4 className="sign-up-text"> Sign Up</h4> </div> </Link>
                    </div>
                </header>
                <div className="test"></div>

                <div className="front-page">
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
                        <br/>
                        <br/>
                        <br/>
                        <div className="sign-up">
                            <h4 className="sign-up-text">Sign Up</h4>
                        </div>
                    </div>
                    <div className="front-page-pic"></div>
                </div>
                {placeholder}
            </div>
        )
    }
}

export default Home;


import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Hamburger from './hamburger';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.refreshPageOrRedirect = this.refreshPageOrRedirect.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.handleRedirectToDemo = this.handleRedirectToDemo.bind(this);
    }
    handleRedirectToDemo(){
        this.props.history.push({ pathname: "/login", state: { demoActive: true }});
        // document.getElementBy Id("demo").click();

    }
    refreshPageOrRedirect() {
        if (this.props.match.path === "/") {
            window.location.reload();
        } else {
            this.props.history.push("/");
        }
    }
    toggleDarkMode(e) {
        const body = document.querySelector("body");
    
        if (body.getAttribute("data-theme")) {
            localStorage.setItem("theme", "light")
            e.target.innerHTML = "Dark Mode";
            body.removeAttribute("data-theme")
        } else {
            localStorage.setItem("theme", "dark")
            e.target.innerHTML = "Light Mode";
            body.setAttribute("data-theme", "dark")
        }
    }
    componentDidMount(){
        const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
        if(currentTheme === "dark") {
            const body = document.querySelector("body");
            const theme = document.querySelector(".theme");
            theme.innerHTML = "Light Mode";
            body.setAttribute("data-theme", "dark")
        }
    }

    render() {
        return (
            <nav>
                <div id="logo" onClick={this.refreshPageOrRedirect}>
                    <div className="logo-image"></div>
                    <h4>SimpleStocks</h4>
                </div>

                <div className="splash-menu-wrapper">
                    <div className="splash-menu">
                        <div className="theme" onClick={this.toggleDarkMode}>Dark Mode</div>
                        <div className="log-in"> <Link to="/login"> Log In </Link></div>
                        <div className="sign-up" onClick={this.handleRedirectToDemo}> <h4>Demo</h4> </div> 
                    </div>
                </div>
            </nav>
        )
    }
}
export default Nav;
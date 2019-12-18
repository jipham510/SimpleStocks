import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from './hamburger';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
        this.refreshPageOrRedirect = this.refreshPageOrRedirect.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.toggleDarkModeMobile = this.toggleDarkModeMobile.bind(this);
        this.handleRedirectToDemo = this.handleRedirectToDemo.bind(this);
        this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    }
    handleRedirectToDemo(){
        this.props.history.push({ pathname: "/login", state: { demoActive: true }});
        // document.getElementBy Id("demo").click();

    }
    refreshPageOrRedirect() {
        if (this.state.refreshing) return;
        if (this.props.match.path === "/") {
            this.setState({ refreshing: true });
            window.location.reload();
        } else {
            this.props.history.push("/");
        }
    }
    toggleDarkModeMobile(e) {
        const body = document.querySelector("body");
    
        if (body.getAttribute("data-theme")) {
            localStorage.setItem("theme", "light")
            e.target.innerHTML = `<i class="menu-item-symbol fas fa-moon"></i>Dark Mode`;
            body.removeAttribute("data-theme")
        } else {
            localStorage.setItem("theme", "dark")
            e.target.innerHTML = `<i class="menu-item-symbol fas fa-sun"></i>Light Mode`;
            body.setAttribute("data-theme", "dark")
        }
    }
    toggleDarkMode(e) {
        const body = document.querySelector("body");
    
        if (body.getAttribute("data-theme")) {
            localStorage.setItem("theme", "light")
            e.target.innerHTML = `Dark Mode`;
            body.removeAttribute("data-theme")
        } else {
            localStorage.setItem("theme", "dark")
            e.target.innerHTML = `Light Mode`;
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
    handleHamburgerClick() {
        const hamburgerBtn = document.querySelector('.splash__nav .hamburger-btn');
        const menu = document.querySelector('.menu');
        const menuNav = document.querySelector('.menu-nav');
        const menuItems = document.querySelector('.menu-items');
        if (hamburgerBtn.classList.contains("close")) {
            hamburgerBtn.classList.remove("close");
            menu.classList.remove("open");
            menuNav.classList.remove("open");
            menuItems.classList.remove("open");
        } else {
            hamburgerBtn.classList.add("close");
            menu.classList.add("open");
            menuNav.classList.add("open");
            menuItems.classList.add("open");
        }
    }
    render() {
        return (
            <nav className="splash__nav">
                <div id="logo" onClick={this.refreshPageOrRedirect}>
                    <div className="logo-image"></div>
                    <h4>SimpleStocks</h4>
                </div>

                <Hamburger handleHamburgerClick={this.handleHamburgerClick} />

                <div className="menu">
                    <ul className="menu-nav">
                        <li className="menu-header">
                            Menu
                        </li>
                        <li className="menu-items" onClick={this.toggleDarkModeMobile}>
                            <i className="menu-item-symbol fas fa-moon"></i>
                            Dark Mode
                        </li>
                        <li className="menu-items" onClick={this.handleRedirectToDemo} >
                            <i className="menu-item-symbol far fa-id-card"></i>
                            Demo
                        </li>
                             
                        { 
                            (this.props.match.path !== "/") && 
                            (
                                <li className="menu-items" onClick={this.refreshPageOrRedirect}>
                                    <i className="menu-item-symbol fas fa-home"></i>
                                    Home
                                </li>
                            ) 
                        }
                        {
                            (this.props.match.path !== "/login") && 
                            (
                                <li className="menu-items" onClick={() => this.props.history.push("/login")} >
                                    <i className="menu-item-symbol fas fa-sign-in-alt"></i>
                                    Log In
                                </li>
                            ) 
                        }
                        {
                            (this.props.match.path !== "/signup") && 
                            (
                                <li className="menu-items" onClick={() => this.props.history.push("/signup")} >
                                        <i className="menu-item-symbol fas fa-user-plus"></i>
                                    Sign Up
                                </li>
                            ) 
                        }
                        
                    </ul>
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
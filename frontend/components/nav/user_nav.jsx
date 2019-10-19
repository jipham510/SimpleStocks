import React from 'react';
import SearchBarContainer from '../search_bar/search_bar_container';
import Hamburger from './hamburger';
class UserNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
        this.refreshPageOrRedirect = this.refreshPageOrRedirect.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.showStocks = this.showStocks.bind(this);
        this.handleCloseStocks = this.handleCloseStocks.bind(this);
        this.decideRenderStock = this.decideRenderStock.bind(this);
    }

    refreshPageOrRedirect() {
        if(this.state.refreshing) return;
        if (this.props.match.path === "/") {
            this.setState({ refreshing: true});
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
    componentDidMount() {
        const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
        if (currentTheme === "dark") {
            const body = document.querySelector("body");
            const theme = document.querySelector(".theme");
            theme.innerHTML = "Light Mode";
            body.setAttribute("data-theme", "dark")
        }
    }
    handleHamburgerClick(){
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const menu = document.querySelector('.menu');
        const menuNav = document.querySelector('.menu-nav');
        const menuItems = document.querySelector('.menu-items'); 
        if( hamburgerBtn.classList.contains("close") ) {
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
    showStocks(){
        const watchlist = document.querySelector('.watchlist');
        if (watchlist.classList.contains("open")) {
            watchlist.classList.remove("open");
        } else {
            watchlist.classList.add("open");
            this.handleHamburgerClick();
        }
    }
    handleCloseStocks(){
        const watchlist = document.querySelector('.watchlist');

    }
    decideRenderStock(){
        if (this.props.match.path === "/") {
            return (
                <li className="menu-items" onClick={this.showStocks}>
                    Stocks
                </li>
            )
        }
        else {
            return (
                <li className="menu-items" onClick={this.refreshPageOrRedirect}>
                    Home
                </li>
            )
        }
    }
    render() {
        return (
            <header className="user-page-header">
                <div id="logo" onClick={this.refreshPageOrRedirect}>
                    <div className="logo-image"></div>
                </div>
                <SearchBarContainer />
                <Hamburger handleHamburgerClick={this.handleHamburgerClick}/>

                <div className="menu">
                    <ul className="menu-nav">
                        <li className="menu-header">
                            Menu
                        </li>
                        <li className="menu-items" onClick={this.toggleDarkMode}>
                            Dark Mode
                        </li>
                        { this.decideRenderStock()}
                        <li className="menu-items" onClick={this.props.logout} >
                            Log Out
                        </li>
                    </ul>
                </div>
                <div className="user-nav-menu-wrapper">
                    <div className="user-nav-menu">
                        <div className="theme" onClick={this.toggleDarkMode}>Dark Mode</div>
                        <div className="home-btn" onClick={this.refreshPageOrRedirect}>Home</div>
                        <div onClick={this.props.logout} className="user-logout-btn">Log Out</div>
                    </div>
                </div>

            </header>
        )
    }
}
export default UserNav;
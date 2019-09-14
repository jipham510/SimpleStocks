import React from 'react';
import SearchBarContainer from '../search_bar/search_bar_container'
class UserNav extends React.Component {
    constructor(props) {
        super(props);
        this.refreshPageOrRedirect = this.refreshPageOrRedirect.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
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
    componentDidMount() {
        const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
        if (currentTheme === "dark") {
            const body = document.querySelector("body");
            const theme = document.querySelector(".theme");
            theme.innerHTML = "Light Mode";
            body.setAttribute("data-theme", "dark")
        }
    }

    render() {
        return (
            <header className="user-page-header">
                <div id="logo" onClick={this.refreshPageOrRedirect}>
                    <div className="logo-image"></div>
                </div>
                <SearchBarContainer />

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
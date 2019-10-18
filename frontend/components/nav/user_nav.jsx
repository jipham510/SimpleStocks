import React from 'react';
import SearchBarContainer from '../search_bar/search_bar_container';
import Hamburger from './hamburger';
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
    handleHamburgerClick(e){
        const hamburger = e.currentTarget;
        if( hamburger.classList.contains("close") ) {
            hamburger.classList.remove("close")
        } else {
            hamburger.classList.add("close");
        }
        // $(document).ready(function () {
//   const menu = $('.menu');
//   const menuNav = $('.menu-nav');
//   const menuItems = $('.menu-items');
//   const menuBtn = $('.menu-btn');
//   let showMenu = false;
//   menuBtn.click(toggleMenu);

//   function toggleMenu() {
//     if (!showMenu) {
//       menuBtn.addClass("close");
//       menu.addClass("open");
//       menuNav.addClass("open");
//       menuItems.addClass("open");
//       showMenu = true;
//     } else {
//       menuBtn.removeClass("close");
//       menu.removeClass("open");
//       menuNav.removeClass("open");
//       menuItems.removeClass("open");
//       showMenu = false;
//     }
//   }
// });

    }
    render() {
        return (
            <header className="user-page-header">
                <div id="logo" onClick={this.refreshPageOrRedirect}>
                    <div className="logo-image"></div>
                </div>
                <SearchBarContainer />
                <Hamburger handleHamburgerClick={this.handleHamburgerClick}/>
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
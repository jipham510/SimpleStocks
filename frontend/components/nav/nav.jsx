import React from 'react';

class Nav extends React.Component {
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

                <div className="menu">
                    <div className="theme" onClick={this.toggleDarkMode}>Dark Mode</div>
                </div>
            </nav>
        )
    }
}
export default Nav;
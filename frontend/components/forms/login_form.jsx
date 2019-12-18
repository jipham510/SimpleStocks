import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/nav_container';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            disabled: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }
    componentDidMount(){
        const state = this.props.history.location.state;
        if (state && state.demoActive) this.handleDemo();
    }
    componentWillUnmount(){
        this.props.clearErrors();
    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.disabled) {
            const user = Object.assign({}, this.state);
            this.props.processForm(user); 
        }
    }

    handleDemo(e){
        if(!this.state.disabled) {
            this.setState({ disabled: true});
            let user = "Demo_User";
            let pass = "password";
            const demoBtn = document.getElementById("demo");
            const loginBtn = document.getElementById("login-form-button");
            demoBtn.setAttribute("button-theme", "disabled");
            loginBtn.setAttribute("button-theme", "disabled");
            this.setState(
                { username: "", password: "" },
                () => this.demoLogin(user,pass) 
            );
        }
    }
    demoLogin(user,pass) {
        user = user.split("");
        pass = pass.split("");
        const _demoUser = (user) => {
            if (user.length > 0) {
                let char = user.shift();
                this.setState(
                    { username: this.state.username + char },
                    () => setTimeout(() => { _demoUser(user) }, 50)
                )
            } else {
                _demoPass(pass);
            }
        }
        const _demoPass = (pass) => {
            if (pass.length > 0) {
                let char = pass.shift();
                this.setState(
                    { password: this.state.password + char },
                    () => setTimeout(() => { _demoPass(pass) }, 50)
                )
            } else {
                const demo_user = Object.assign({}, this.state);
                this.props.processForm(demo_user);
            }
        }
        _demoUser(user);
    }

    render() {
        return (
            <div className="background-img">
                <header className="splash__nav">
                    <NavContainer />
                </header>
                <div className="login-form">
                    <div className="text1"><h1>Welcome to SimpleStocks</h1></div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="email-username">
                            <div className="text2">
                                <h2>Username</h2>
                            </div>
                            <input type="text" className="input-field" value={this.state.username} onChange={this.update('username')} />
                        </div>
                        <div className="password">
                            <div className="text2">
                                <h2>Password</h2>
                            </div>
                            <input type="password" className="input-field" value={this.state.password} onChange={this.update('password')} />
                        </div>
                        <div className="forgot-user-pass">
                            < Link to="/signup" id="forgot-up"> Don't have an account? Sign up! </Link>
                        </div>
                        <ul className="errors">
                            {this.props.errors.map((error, i) => (
                                <li key={i}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                        <div className="login-form-submit-wrapper">
                            <input type="submit" className="form-button" value="Sign In" id="login-form-button"/>
                            <div className="form-button" id="demo" onClick={this.handleDemo}>
                                <h4>Demo</h4>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default LoginForm;

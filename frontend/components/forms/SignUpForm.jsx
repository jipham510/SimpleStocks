import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/nav_container';
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectDemo = this.redirectDemo.bind(this);
        this.handleLogoClick = this.handleLogoClick.bind(this);
    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }
    redirectDemo() {

    }
    handleLogoClick(){
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <header>
                    <NavContainer />
                </header>
                <div className="signup-form">
                    <h1>Make Your Money Move</h1>
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
                            < Link to="/login" id="forgot-up"> Already have an account? Sign In! </Link>
                        </div>
                        <div className="form-button" id="sign-up">
                            <h4>
                                <input type="submit" className="sign-in-button" value="Sign Up" />
                            </h4>
                        </div>
                    </form>
                    <ul>
                        {this.props.errors.map((error, i) => (
                            <li key={i}>
                                {error}
                            </li>
                        ))}
                    </ul>

                    <div className="form-button" id="demo" onClick={this.redirectDemo}>
                        <h4>Demo</h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignUpForm;
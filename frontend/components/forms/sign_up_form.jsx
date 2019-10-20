import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/nav_container';
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            email: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectDemo = this.redirectDemo.bind(this);
        this.formatErrors = this.formatErrors.bind(this);
    }
    componentWillUnmount() {
        this.props.clearErrors();
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
        this.props.history.push({ pathname: "/login", state: { demoActive: true } });
    }

    formatErrors(){
        return this.props.errors[0];
    }
    render() {
        return (
            <div className="SignUpForm">
                <header className="splash-nav">
                    <NavContainer />
                </header>
                <div className="signup-body-parent">
                <div className="signup-body">
                    <div className="signup-form">
                        <h1 className="signup-form-heading1">Make Your Money Move</h1>
                            <h3 className="signup-form-heading2">Simple Stocks lets you invest in companies you love, <br/>commission-free</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="name-form">
                                    <input type="text" placeholder="First Name" className="input-field first-name" value={this.state.first_name} onChange={this.update('first_name')} />
                                    <input type="text" placeholder="Last Name" className="input-field last-name" value={this.state.last_name} onChange={this.update('last_name')}/>
                            </div>
                            <div className="email">
                                <br/>
                                    <input type="text" placeholder="Email" className="input-field" value={this.state.email} onChange={this.update('email')}/>
                            </div>
                                <div className="username">
                                <br/>
                                    <input type="text" placeholder="Username" className="input-field" value={this.state.username} onChange={this.update('username')} />
                            </div>
                            <div className="password">
                                <br/>
                                    <input type="password" placeholder="Password" className="input-field" value={this.state.password} onChange={this.update('password')} />
                            </div>
                                <ul className="errors">
                                    {this.formatErrors()}
                                </ul> 
                            <div className="sign-up-submit-wrapper">
                                <input type="submit" className="form-button" value="Sign Up" id="signup-form-button" />

                                <div className="form-button" onClick={this.redirectDemo}>
                                    <h4>Demo</h4>
                                </div>
                            </div>

                        </form>

                        <br/>
                            <div className="already-have-acc">
                                < Link to="/login" id="already-have-acc-text">Already have an account? Sign In! </Link>
                        </div>
                    </div>
                    <div className="right-side-content">
                        <video autoPlay loop muted id="video-background">
                                <source src={window.signUpVideoURL} type="video/mp4"></source>
                        </video>
                        <div className="content-description">
                            <h4>Stay on top of your portfolio. </h4>
                            <h4>Anytime. Anywhere. </h4>
                            <br/>
                            <h5>Fast execution, real-time market data, and</h5>
                            <h5>smart notifications help you make the most</h5> 
                            <h5>of the stock market no matter where you are.</h5>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
{/* (/assets/splashimage.png); */}
export default SignUpForm;
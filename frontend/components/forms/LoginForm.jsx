import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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

    test() {
        // debugger
        return (
            <ul>
                {this.props.errors.map((error,i) => (
                    <li key={i}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }
    render() {

        return (
            <div className="background-img">
                <div className="login-form">
                    <div className="text1"><h1>Welcome to SimpleStocks</h1></div>
                    <form onSubmit={this.handleSubmit}>

                        <div className="email-username">
                            <div className="text2">
                                <h2>Email or Username</h2>
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
                        <div className="form-button" id="sign-in">
                            <h4>
                                <input type="submit" className="sign-in-button" value="Sign In" />
                            </h4>
                        </div>
                    </form>
                    {this.test()}

                    <div className="form-button" id="demo">
                        <h4>Demo</h4>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginForm;
            // <div>

    
            //     Redirect to: < Link to="/signup" > signup </Link>
            //     <form onSubmit={this.handleSubmit}>
            //         <label>Username
            //             <input type="text" className="username" value={this.state.username} onChange={this.update('username')} />
            //         </label>
            //         <label>Password
            //             <input type="password" className="username" value={this.state.password} onChange={this.update('password')} />
            //         </label>
            //         <input type="submit" value={this.props.formType} />
            //     </form>

            // </div>
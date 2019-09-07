import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
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

        const show = (this.props.match.path === "/login") ? < Link to="/signup" > signup </Link> : <Link to="/login"> login </Link>;
        return (
            <div>
                Redirect to: {show}
                <form onSubmit={this.handleSubmit}>
                    <label>Username
                        <input type="text" className="username" value={this.state.username} onChange={this.update('username')} />
                    </label>
                    <label>Password
                        <input type="password" className="username" value={this.state.password} onChange={this.update('password')} />
                    </label>
                    <input type="submit" value={this.props.formType} />
                </form>
                {this.test()}

            </div>
        )
    }
}
export default SessionForm;
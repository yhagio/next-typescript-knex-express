import * as React from 'react';
import Router from 'next/router';

import { signupUser } from '../lib/auth';

interface IState {
    username: string;
    email: string;
    password: string;
    error: string;
    isLoading: boolean;
    success: boolean;
}

class Signup extends React.Component<IState, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            success: false,
            isLoading: false
        };
    }

    handleClose = () => this.setState({ openError: false });

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        });
    };

    handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        const { username, email, password } = this.state;

        event.preventDefault();
        const user = { username, email, password };
        this.setState({ isLoading: true, error: '' });

        signupUser(user)
            .then(({ user }) => {
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true,
                    isLoading: false
                });
                Router.push(`/profile/${user.id}`);
            })
            .catch(this.showError);
    };

    showError = (err: any) => {
        this.setState({
            error: err.message || 'Unexpected Error',
            isLoading: false
        });
    };

    render() {
        const { error, isLoading } = this.state;

        const errorMsg = error && <div>{error}</div>;

        return (
            <div className="container" style={{ maxWidth: '600px' }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="button is-primary"
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>
                    </div>

                    <p className="help is-danger">{errorMsg}</p>
                </form>
            </div>
        );
    }
}

export default Signup;

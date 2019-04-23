import * as React from 'react';
import Router from 'next/router';

import { signinUser } from '../lib/auth';

interface IState {
    email: string;
    password: string;
    error: string;
    isLoading: boolean;
}

class Signin extends React.Component<IState, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
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
        const { email, password } = this.state;

        event.preventDefault();
        const user = { email, password };
        this.setState({ isLoading: true, error: '' });
        signinUser(user)
            .then(({ user }) => {
                Router.push(`/profile/${user.id}`);
            })
            .catch(this.showError);
    };

    showError = (err: any) => {
        this.setState({ error: err.message, isLoading: false });
    };

    render() {
        const { error, isLoading } = this.state;

        const errorMsg = error && <div>{error}</div>;

        return (
            <div className="container" style={{ maxWidth: '600px' }}>
                <form onSubmit={this.handleSubmit}>
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
                                {isLoading ? 'Logging in...' : 'Log in'}
                            </button>
                        </div>
                    </div>

                    <p className="help is-danger">{errorMsg}</p>
                </form>
            </div>
        );
    }
}

export default Signin;

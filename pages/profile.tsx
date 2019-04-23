import React from 'react';
import Link from 'next/link';

import { authInitialProps } from '../lib/auth';
import { getUser } from '../lib/api';

interface IProps {
    userId: string;
    auth: any;
}

interface IState {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error?: string;
}

interface IUser {
    id?: string;
    username?: string;
    email?: string;
}

class Profile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            user: {},
            isAuth: false,
            isLoading: true,
            error: undefined
        };
    }

    componentDidMount() {
        const { userId, auth } = this.props;

        getUser(userId)
            .then(async ({ user }) => {
                const isAuth = auth.user.id === userId;
                this.setState({
                    user,
                    isAuth,
                    isLoading: false
                });
            })
            .catch(this.showError);
    }

    showError = (err: any) => {
        this.setState({
            error: err.message || 'Unexpected Error',
            isLoading: false
        });
    };

    render() {
        const { isLoading, user, error } = this.state;

        if (isLoading) {
            return <div>Loading</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="container">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-5">Profile</p>
                            <hr />
                            <p className="subtitle is-6">ID: {user.id}</p>
                            <p className="subtitle is-6">
                                UserName: {user.username}
                            </p>
                            <p className="subtitle is-6">Email: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

(Profile as any).getInitialProps = authInitialProps(true);

export default Profile;

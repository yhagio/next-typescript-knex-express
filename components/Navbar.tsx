import { Fragment } from 'react';
import ActiveLink from './ActiveLink';
import { signoutUser } from '../lib/auth';

interface IProps {
    pageProps: {
        auth: any;
    };
}

const Navbar = ({ pageProps: { auth } }: IProps) => {
    const { user = {} } = auth || {};

    const userRelated =
        user && user.id ? (
            <div className="navbar-start">
                <a className="navbar-item" onClick={signoutUser}>
                    Sign out
                </a>
            </div>
        ) : (
            <Fragment>
                <div className="navbar-start">
                    <ActiveLink href="/signin">Sign in</ActiveLink>
                </div>
                <div className="navbar-start">
                    <ActiveLink href="/signup">Sign up</ActiveLink>
                </div>
            </Fragment>
        );

    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand navbar-item">
                <ActiveLink href="/">NextConnect</ActiveLink>
            </div>
            <div className="navbar-menu">
                {user && user.id && (
                    <div className="navbar-start navbar-item">
                        <ActiveLink href={`/profile/${user.id}`}>
                            Profile
                        </ActiveLink>
                    </div>
                )}
                <div className="navbar-end">
                    <div className="navbar-item">{userRelated}</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

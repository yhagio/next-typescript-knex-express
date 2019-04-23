import { withRouter } from 'next/router';

const ActiveLink = ({ router, href, children }: any) => {
    (function prefetchPages() {
        if (typeof window !== 'undefined') {
            router.prefetch(router.pathname);
        }
    })();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        router.push(href);
        if (href === '/' && router.pathname !== href) {
            window.location.pathname = href;
        }
    };

    const isCurrentPath = router.pathname === href || router.asPath === href;

    return (
        <a
            href={href}
            onClick={handleClick}
            className="navbar-item"
            style={{
                fontWeight: isCurrentPath ? 'bold' : 'normal',
                color: isCurrentPath ? '#333' : '#224455'
            }}
        >
            {children}
        </a>
    );
};

export default withRouter(ActiveLink);

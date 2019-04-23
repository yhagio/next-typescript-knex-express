import App, { Container } from 'next/app';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import { getSessionFromServer, getSessionFromClient } from '../lib/auth';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }: any) {
        let pageProps: any = {};
        const user =
            ctx && ctx.req
                ? getSessionFromServer(ctx.req)
                : getSessionFromClient();

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        pageProps.auth = user;

        return { pageProps };
    }

    constructor(props: any) {
        super(props);
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <title>NextConnect</title>
                </Head>
                <Navbar {...this.props} />
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default MyApp;

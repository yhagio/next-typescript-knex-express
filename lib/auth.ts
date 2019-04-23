import Router from "next/router";
import axios from "axios";

export const getSessionFromServer = (req: any) => {
    if (req.signedCookies) {
        return { user: req.signedCookies.next_token };
    }
    return {};
};

export const getSessionFromClient = (): any => {
    const user = localStorage
        ? JSON.parse(localStorage.getItem('next_token_user') as any)
        : {};

    return { user };
};

const redirectUser = (res: any, path: string) => {
    if (res) {
        res.redirect(302, path);
        res.finished = true;
        return {};
    }
    Router.replace(path);
    return {};
};

export const authInitialProps = (isProtectedRoute: boolean) => ({
    req,
    res,
    query: { userId }
}: any) => {
    const auth = req ? getSessionFromServer(req) : getSessionFromClient();
    const currentPath = req ? req.url : window.location.pathname;
    const user = auth.user;
    const isAnonymous = !user;
    if (isProtectedRoute && isAnonymous && currentPath !== "/signin") {
        return redirectUser(res, "/signin");
    }
    return { auth, userId };
};

export const signupUser = async (user: any) => {
    const { data } = await axios.post("/api/auth/signup", user);
    if (localStorage) {
        localStorage.setItem('next_token_user', JSON.stringify(data.user))
    }

    return data;
};

export const signinUser = async (user: any) => {
    const { data } = await axios.post("/api/auth/login", user);
    if (localStorage) {
        localStorage.setItem('next_token_user', JSON.stringify(data.user))
    }

    return data;
};

export const signoutUser = async () => {
    await axios.get("/api/auth/logout");
    if (localStorage) {
        localStorage.removeItem('next_token_user')
    }
    Router.push("/signin");
};

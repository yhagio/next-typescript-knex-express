import { Request, Response, NextFunction } from 'express';

import AuthService from '../service/auth/service';
import { IUserService } from '../service/user/interface';
import { InvalidError } from '../shared/error/invalid';
import { UnauthorizedError } from '../shared/error/unauth';

export default class AuthHandler {
    constructor(
        private authService: AuthService,
        private userService: IUserService,
        private cookieOptions: any
    ) {}

    async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const newUser = await this.userService.create(req.body);
            const token = await this.authService.issueToken(newUser.id);
            res.cookie('next_token', newUser, this.cookieOptions);
            res.status(200).json({ user: newUser, token });
        } catch (err) {
            next(err);
        }
    }

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await this.userService.getByEmailWithPassword(
                req.body.email
            );
            if (
                !user ||
                !this.authService.checkPassword(
                    req.body.password,
                    user.password
                )
            ) {
                throw new InvalidError('Invalid email or password');
            }
            const token = await this.authService.issueToken(user.id);
            const { password: _, ...rest } = user;
            res.cookie('next_token', { ...rest }, this.cookieOptions);
            res.status(200).json({ token, user: { ...rest } });
        } catch (err) {
            next(err);
        }
    }

    async logout(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('next_token', this.cookieOptions);
            res.status(200).json({ message: 'logged out' });
        } catch (err) {
            next(err);
        }
    }

    async checkAuth(
        req: Request,
        _: Response,
        next: NextFunction
    ): Promise<void> {
        if (req.signedCookies && req.signedCookies.next_token) {
            next();
        } else {
            next(new UnauthorizedError('Needs to login'));
        }
    }
}

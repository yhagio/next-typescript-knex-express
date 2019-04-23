import { IUserService } from '../service/user/interface';
import { NextFunction, Response, Request } from 'express';

export default class UserHandler {
    constructor(private userService: IUserService) {}

    async getOneByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await this.userService.getOneByUserId(
                req.params.userId
            );
            res.status(200).json({ user });
        } catch (err) {
            next(err);
        }
    }
}

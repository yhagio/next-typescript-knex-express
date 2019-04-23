import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IConfig } from '../../shared/config';
import { IAuthService } from './interface';

export default class AuthService implements IAuthService {
    constructor(private config: IConfig) {}

    async checkPassword(
        inputPassword: string,
        dbPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(inputPassword, dbPassword);
    }

    issueToken(userId: string): string {
        return jwt.sign({ id: userId }, this.config.get('jwt.secret'), {
            expiresIn: this.config.get('jwt.expiresin')
        });
    }

    async verifyToken(token: string): Promise<string> {
        return <string>jwt.verify(token, this.config.get<string>('jwt.secret'));
    }
}

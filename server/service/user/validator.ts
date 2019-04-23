import {
    IUserService,
    IUserSignUp,
    IUserAccount,
    IUserWithPassword
} from './interface';
import { InvalidError } from '../../shared/error/invalid';

export default class UserValidator implements IUserService {
    constructor(private dataAccess: IUserService) {}

    create(user: IUserSignUp): Promise<IUserAccount> {
        if (!user) {
            throw new InvalidError('User is required');
        } else if (!user.username) {
            throw new InvalidError('username is required');
        } else if (!user.email) {
            throw new InvalidError('email is required');
        } else if (!user.password) {
            throw new InvalidError('password is required');
        }
        return this.dataAccess.create(user);
    }

    getByEmailWithPassword(email: string): Promise<IUserWithPassword> {
        if (!email) {
            throw new InvalidError('email is required');
        }
        return this.dataAccess.getByEmailWithPassword(email);
    }

    getOneByUserId(userId: string): Promise<IUserAccount> {
        if (!userId) {
            throw new InvalidError('userId is required');
        }
        return this.dataAccess.getOneByUserId(userId);
    }
}

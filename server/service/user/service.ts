import {
    IUserService,
    IUserSignUp,
    IUserAccount,
    IUserWithPassword
} from './interface';

export default class UserService implements IUserService {
    constructor(private validator: IUserService) { }

    async create(user: IUserSignUp): Promise<IUserAccount> {
        return this.validator.create(user);
    }

    async getByEmailWithPassword(email: string): Promise<IUserWithPassword> {
        return this.validator.getByEmailWithPassword(email);
    }

    async getOneByUserId(userId: string): Promise<IUserAccount> {
        return this.validator.getOneByUserId(userId);
    }
}

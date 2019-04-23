import Knex from 'knex';
import bcrypt from 'bcrypt';
import {
    IUserSignUp,
    IUserAccount,
    IUserWithPassword
} from '../../service/user/interface';
import { IUserDataAccess } from './interface';

export default class UserDataAccess implements IUserDataAccess {
    constructor(private knex: Knex) {}

    async create(user: IUserSignUp): Promise<IUserAccount> {
        user.password = await bcrypt.hash(user.password, 10);

        const [created] = await this.knex
            .insert(user)
            .into('users')
            .returning(['id', 'username', 'email']);
        return created;
    }

    async getByEmailWithPassword(email: string): Promise<IUserWithPassword> {
        return this.knex
            .select('id', 'username', 'email', 'password')
            .from('users')
            .where({ email })
            .first();
    }

    async getOneByUserId(userId: string): Promise<IUserAccount> {
        return this.knex
            .select('id', 'username', 'email')
            .from('users')
            .where({ id: userId })
            .first();
    }
}

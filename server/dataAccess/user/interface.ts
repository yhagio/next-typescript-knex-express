import {
    IUserSignUp,
    IUserAccount,
    IUserWithPassword
} from '../../service/user/interface';

export interface IUserDataAccess {
    create(user: IUserSignUp): Promise<IUserAccount>;
    getByEmailWithPassword(email: string): Promise<IUserWithPassword>;
    getOneByUserId(userId: string): Promise<IUserAccount>;
}

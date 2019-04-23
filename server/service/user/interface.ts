export interface IUserService {
    create(user: IUserSignUp): Promise<IUserAccount>;
    getByEmailWithPassword(email: string): Promise<IUserWithPassword>;
    getOneByUserId(userId: string): Promise<IUserAccount>;
}

export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserAccount {
    id: string;
    username: string;
    email: string;
}

export interface IUserWithToken extends IUserAccount {
    token: string;
}

export interface IUserWithPassword {
    id: string;
    username: string;
    email: string;
    password: string;
}

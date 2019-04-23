export interface IAuthService {
    checkPassword(inputPassword: string, dbPassword: string): Promise<boolean>;
    issueToken(userId: string): string;
    verifyToken(token: string): Promise<string>;
}

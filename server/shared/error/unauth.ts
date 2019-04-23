import AppError from './app';

export class UnauthorizedError extends AppError {
    public name: string;
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401;
    }
}

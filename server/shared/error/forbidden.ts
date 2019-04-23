import AppError from './app';

export class ForbiddenError extends AppError {
    public name: string;
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenError';
        this.status = 403;
    }
}

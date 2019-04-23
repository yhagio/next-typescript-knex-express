import AppError from './app';

export class NotFoundError extends AppError {
    public name: string;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

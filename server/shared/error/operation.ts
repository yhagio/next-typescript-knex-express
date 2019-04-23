import AppError from './app';

export class OperationError extends AppError {
    public name: string;
    constructor(message: string) {
        super(message);
        this.name = 'OperationError';
        this.status = 503;
    }
}

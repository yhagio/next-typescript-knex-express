import AppError from './app';

export class InvalidError extends AppError {
    public name: string;
    constructor(message: string) {
        super(message);
        this.name = 'InvalidError';
        this.status = 400;
    }
}

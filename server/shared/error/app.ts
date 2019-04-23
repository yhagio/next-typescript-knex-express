export default abstract class AppError extends Error {
    public name: string;
    public status: number;
    constructor(message: string) {
        super(message);
        this.name = 'AppError';
        this.status = 500;
    }
}

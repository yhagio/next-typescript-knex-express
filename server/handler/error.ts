import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export default function errorHandler(): ErrorRequestHandler {
    return (err: any, _: Request, res: Response, __: NextFunction) => {
        const { status, name, message, stack } = err;
        console.error({ status, name, message, stack });
        res.status(status || 500).json({
            status: status || 500,
            name,
            message: message || 'Unexpected error happened'
        });
    };
}

import express, { Request, Response, Router } from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import config from 'config';

import ErrorHandler from './handler/error';
import { IConfig } from './shared/config';
import AuthHandler from './handler/auth';
import AuthService from './service/auth/service';
import UserService from './service/user/service';
import UserValidator from './service/user/validator';
import UserDataAccess from './dataAccess/user/db';
import DB from './infra/db/knex';
import UserHandler from './handler/user';

const appConfig: IConfig = config;

const dev = appConfig.get('node_env') !== 'production';
const port = appConfig.get('app_port');
const cookieOptions = {
    httpOnly: true,
    secure: appConfig.get('node_env') === 'production',
    signed: true
};

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const db = new DB(appConfig)
        await db.migrate();
        console.log('*** Migration is done ***');
        return db.getConnection();
    })
    .then((conn) => {
        const errorHandler = ErrorHandler();

        const authService = new AuthService(appConfig);
        const userService = new UserService(
            new UserValidator(new UserDataAccess(conn))
        );

        const authHandler = new AuthHandler(
            authService,
            userService,
            cookieOptions
        );
        const userHandler = new UserHandler(userService);

        const server = express();

        if (!dev) {
            server.use(helmet());
            server.use(compression());
        }

        server.use(express.json());
        server.use(cookieParser(appConfig.get('jwt.secret')));

        server.get('/_next/*', (req: Request, res: Response) => {
            handle(req, res);
        });

        server.get('/static/*', (req: Request, res: Response) => {
            handle(req, res);
        });

        const isLoggedIn = authHandler.checkAuth.bind(authHandler);
        const restRouter = Router();

        server.use('/api', restRouter);

        restRouter
            .route('/auth/signup')
            .post(authHandler.signUp.bind(authHandler));
        restRouter
            .route('/auth/login')
            .post(authHandler.login.bind(authHandler));
        restRouter
            .route('/auth/logout')
            .get(authHandler.logout.bind(authHandler));
        restRouter
            .route('/users/:userId')
            .get(isLoggedIn, userHandler.getOneByUserId.bind(userHandler));

        server.get('/profile/:userId', (req: Request, res: Response) => {
            return app.render(req, res, '/profile', {
                ...req.params,
                ...req.query
            });
        });

        server.get('*', (req: Request, res: Response) => {
            handle(req, res);
        });

        server.use(errorHandler);

        server.listen(port, (err: any) => {
            if (err) throw err;
            console.log(`🚀 Server listening on ${port}`);
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

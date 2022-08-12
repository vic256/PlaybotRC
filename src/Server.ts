import express, {Express} from 'express';
import 'express-async-errors';

import {HttpLogger, pinoHttp, } from "pino-http";
import {Logger} from "pino"
import indexRouter from "./routes";
import AuthMiddleware from "./middlewares/AuthMiddleware";


export default class Server {
    private app: Express;
    private readonly port: string;
    private readonly pinoLogger: HttpLogger;
    logger: Logger;

    constructor(port: string = '3000') {
        this.port = port;

        this.app = express();

        this.pinoLogger = pinoHttp();
        this.logger = this.pinoLogger.logger;

        this.app.use(this.pinoLogger);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(new AuthMiddleware().handle);

        this.app.use(indexRouter);
    }

    listen() {
        this.app.listen(+this.port, () => {
            this.logger.info(`Server listening on ${this.port}`);
        });
    }
}
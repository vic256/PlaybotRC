import {NextFunction, Request, Response} from "express";
import AuthService from "../services/AuthService";
import User from "../models/User";

export default class AuthMiddleware {
    async handle(req: Request, res: Response, next: NextFunction) {
        const service = new AuthService();

        let header = req.header('Authorization');
        if(!header) return next();

        header = header.replace('Bearer ', '')

        const payload = await service.verifyJwt(header);
        if(typeof payload === 'string') return next();

        res.locals['user'] = User.findOne(payload['id']);

        next();
    }
}
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import AuthService from "../services/AuthService";
import User from "../models/User";

const router = Router();
const authService = new AuthService();

const {OK, BAD_REQUEST } = StatusCodes;

router.post('/register', async (req: Request, res: Response) => {
    if(res.locals['user']) return res.status(BAD_REQUEST).json({message: 'You\'re already logged!'});

    const {email, password} = req.body;
    if(!email || !password) return res.status(BAD_REQUEST).json({message: 'Missing parameters'});
    if(User.findBy('email', email)) return res.status(BAD_REQUEST).json({message: 'You already have an account'});
    const user = await authService.register(email, password);

    return res.status(OK).json(User.serialize(user));
})

router.post('/login', async (req: Request, res: Response) => {
    if(res.locals['user']) return res.status(BAD_REQUEST).json({message: 'You\'re already logged!'});

    const {email, password} = req.body;
    if(!email || !password) return res.status(BAD_REQUEST).json({message: 'Missing parameters'});

    const jwt  = await authService.login(email, password);
    if(!jwt) return res.status(BAD_REQUEST).json({message: 'Bad password!'});

    return res.status(OK).json({token: jwt});
})

export default router;
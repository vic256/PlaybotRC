import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import UserService from "../services/UserService";
import User from "../models/User";

const router = Router();
const userService = new UserService();
const {OK, NOT_FOUND, FORBIDDEN, UNAUTHORIZED } = StatusCodes;

router.get('/:id', (req: Request, res: Response) => {
    if(!res.locals['user']) return res.status(UNAUTHORIZED).json({message: 'You\'re not authenticated!'});
    const id: string = req.params['id'] ? req.params['id'] : '@me';

    if(id === '@me' || id === res.locals['user']['id']) return res.status(OK).json(User.serialize(res.locals['user']));
    if(!res.locals['user']['isAdmin']) return res.status(FORBIDDEN).json({message: 'You can\'t do that!'});
    const user = userService.show(id);

    if(!user) return res.status(NOT_FOUND).json({message: 'User doesn\'t exist!'});
    return res.status(OK).json(User.serialize(user));
})

export default router;
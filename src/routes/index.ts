import { Router } from 'express';
import user from "./user";
import auth from "./auth";


const indexRouter = Router();

indexRouter.get('/', (...[, res]) => {
    res.status(200).json({hello: 'world'});
})
indexRouter.use('/users', user);
indexRouter.use('/auth', auth);

export default indexRouter;

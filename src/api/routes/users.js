import {Router} from 'express';
import {controllers} from '../index.js';
import {tagModelRouter} from "./tag_model.js";

const userRouter = Router();

userRouter.get('/prisma_user/:name', controllers.users.getFullUserDataByNamePrisma);
tagModelRouter.post('/prisma_user/:name', controllers.users.postFullUserDataByName);

userRouter.get('/user/:name', controllers.users.getFullUserDataByName);
tagModelRouter.post('/user/:name', controllers.users.postFullUserDataByName);

export { userRouter };
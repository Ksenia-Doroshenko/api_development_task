import {Router} from 'express';
import {controllers} from '../index.js';
import {validationMiddleware} from "../../_start.js";
import {updateSchema} from "../validations/user.js";

const userRouter = Router();

userRouter.get('/prisma_user/:name', controllers.users.getFullUserDataByNamePrisma);
userRouter.post('/prisma_user/:name', controllers.users.postFullUserDataByName);

userRouter.get('/user/:name', controllers.users.getFullUserDataByName);
userRouter.post('/user/:name', controllers.users.postFullUserDataByName);

userRouter.patch('/', validationMiddleware({
    body: updateSchema
}), controllers.users.updateUserData);

userRouter.post('/avatar', controllers.users.uploadAvatar);

export {userRouter};
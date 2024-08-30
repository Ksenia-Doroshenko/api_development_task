import {Router} from 'express';
import {userRouter} from './users.js';
import {tagModelRouter} from './tag_model.js';
import {jwtAuthMiddleware} from "../../_start.js";

const router = Router();

router.use('/users', jwtAuthMiddleware, userRouter);
router.use('/tag_models', jwtAuthMiddleware, tagModelRouter);
router.use('/auth')
    .get(jwtAuthMiddleware, controllers.system.authentication)
    .post(validate({
        body: validators.system.auth
    }), controllers.system.authorization);

export { router };
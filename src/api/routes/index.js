import { Router } from 'express';
import { userRouter } from './users.js';
import { tagModelRouter } from './tag_model.js';

const router = Router();

router.use('/users', userRouter);
router.use('/tag_models', tagModelRouter);

export { router };
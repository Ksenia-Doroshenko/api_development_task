const { Router } = require('express');
const userRouter = require('./users.js');
const tagModelRouter = require('./tag_model.js');

const router = Router();

router.use('/users', userRouter);
router.use('/tag-models', tagModelRouter);

module.exports = {
    router
};
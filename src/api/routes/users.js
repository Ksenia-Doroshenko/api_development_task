const controllers = require('../index.js').controllers;
const bodyParser = require('body-parser');
const { Router } = require('express');

const userRouter = Router();
userRouter.use(bodyParser.json());

userRouter.get('/prisma_user/:name', controllers.users.getFullUserDataByNamePrisma);
userRouter.post('/prisma_user/:name', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

userRouter.get('/user/:name', controllers.users.getFullUserDataByName);
userRouter.post('/user/:name', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

module.exports = {
    userRouter
};
import {Router} from 'express';
import {controllers} from '../index.js';
import {jwtAuthMiddleware, validationMiddleware} from "../../_start.js";
import {authSchema, registerSchema} from "../validations/system.js";

const authRouter = Router({mergeParams: true});

authRouter.route('/register')
    .post(validationMiddleware({
        body: registerSchema
    }), controllers.system.registration);

authRouter.route('/confirm/:hashlink')
    .get(controllers.system.confirmRegistration);

authRouter.route('/')
    .post(validationMiddleware({
        body: authSchema
    }), controllers.system.authorization)
    .get(jwtAuthMiddleware, controllers.system.authorization);

authRouter.get('/refresh_token', controllers.system.refreshUserToken);

export {authRouter}
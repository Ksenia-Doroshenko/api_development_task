import {Router} from 'express';
import {controllers} from '../index.js';
import {jwtAuthMiddleware, validationMiddleware} from "../../_start.js";
import {authSchema, registerSchema} from "../validations/system.js";

const authRouter = Router({mergeParams: true});

authRouter.route('/register')
    .post(validationMiddleware({
        body: registerSchema
    }), controllers.auth.registration);

authRouter.route('/confirm/:hashlink')
    .get(controllers.auth.confirmRegistration);

authRouter.route('/')
    .post(validationMiddleware({
        body: authSchema
    }), controllers.auth.authorization)
    .get(jwtAuthMiddleware, controllers.auth.authorization)

export {authRouter}
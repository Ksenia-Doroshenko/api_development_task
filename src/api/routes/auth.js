import {Router} from 'express';
import {controllers} from '../index.js';
import {validationMiddleware} from "../../_start.js";
import {registerSchema} from "../validations/auth.js";

const authRouter = Router({mergeParams: true});


authRouter.route('/register')
    // .get(jwtAuthMiddleware, controllers.users.getFullUserDataByNamePrisma)
    .post(validationMiddleware({
        body: registerSchema
    }), controllers.auth.registration);

authRouter.route('/confirm/:hashlink')
    // .get(jwtAuthMiddleware, controllers.users.getFullUserDataByNamePrisma)
    .get(controllers.auth.confirmRegistration);

export { authRouter };
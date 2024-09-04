import {queries} from '../index.js'
import bcrypt from 'bcrypt';
import {v6 as uuidv6} from 'uuid';
import {generateTokens, validateToken} from "../../_start.js";
import {getObjectByFields} from "../../utils/getObjectByFields.js";
import {sendConfirmURL} from "../../utils/mails.js";

export async function registration(req, res) {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        const hashlink = uuidv6();

        const newUser = await queries.system.createNewUser({
            name, email, pass: await bcrypt.hash(password, 10), hashlink: hashlink
        });

        await sendConfirmURL({
            to: newUser.email,
            hashlink,
            res
        });

        return res.json({
            message: 'Регистрация прошла успешно'
        });
    } catch (e) {
        return res.json({
            error: e,
            message: 'Ошибка регистрации'
        });
    }
}

export async function confirmRegistration(req, res) {
    try {
        const {
            hashlink
        } = req.params;
        const user = await queries.system.updateActiveUserByHashlink(hashlink);

        return res.json({
            message: 'Аккаунт подтверждён'
        });
    } catch (e) {
        return res.json({
            error: e,
            message: 'Ошибка подтверждения'
        })
    }
}

export async function authentication(req, res) {
    res.json(req.auth);
}

export async function authorization(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await queries.system.getUserByEmail(email);
        const clearUser = getObjectByFields(user, ['id', 'name', 'email']);
        const isSamePasswords = await bcrypt.compare(password, user.pass);

        if (!user || !isSamePasswords) {
            res.status(400).json({message: 'Неверная почта или пароль'})
        } else {
            const tokens = generateTokens(clearUser);
            res.cookie('RefreshToken', tokens.refreshToken);
            await queries.system.setUserRefreshToken(user.id, tokens.refreshToken);
            res.json({user: clearUser, token: tokens.accessToken})
        }

    } catch (e) {
        return res.json({
            error: e,
            message: 'Ошибка авторизации'
        });
    }
}

export async function refreshUserToken(req, res) {
    try {
        const {RefreshToken} = req.cookies;
        if (!RefreshToken) {
            return res.status(401);
        }

        const validateUser = validateToken(RefreshToken, 'refresh');
        console.log(validateUser)
        const user = await queries.system.getUserByRefreshToken(RefreshToken);
        if (!validateUser || !user) {
            return res.status(401);
        }

        let userData = getObjectByFields(user, ['id', 'name', 'email']);

        const tokens = generateTokens(userData);
        await queries.system.setUserRefreshToken(user.id, tokens.refreshToken);
        res.cookie('RefreshToken', tokens.refreshToken);

        return res.json({
            token: tokens.accessToken,
        });
    } catch (e) {
        return res.status(401).json(e);
    }
}

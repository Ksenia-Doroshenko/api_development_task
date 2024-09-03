import {queries} from '../index.js'
import bcrypt from 'bcrypt';
import {v6 as uuidv6} from 'uuid';
import {generateTokens} from "../../_start.js";
import {getObjectByFields} from "../../utils/getObjectByFields.js";

export async function registration(req, res) {
    try{
        const {
            name,
            email,
            password,
        } = req.body;

        const newUser = await queries.auth.createNewUser({
            name, email, pass: await bcrypt.hash(password, 10), hashlink: uuidv6()
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
        const user = await queries.auth.updateActiveUserByHashlink(hashlink);

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

export async function authorization(req, res){
    try {
        const {
            email,
            password
        } = req.body;

        const user = await queries.auth.getUserByEmail(email);
        const clearUser = getObjectByFields(user, ['id', 'name', 'email']);
        const isSamePasswords = await bcrypt.compare(password, user.pass);

        if (!user || !isSamePasswords) {
            res.status(400).json({message: 'Неверная почта или пароль'})
        } else {
            const tokens = generateTokens(clearUser);
            res.cookie('RefreshToken', tokens.refreshToken);
            res.json({user: clearUser, token: tokens.accessToken})
        }

    } catch (e) {
        return res.json({
            error: e,
            message: 'Ошибка авторизации'
        });
    }
}

import {queries} from '../index.js'
import bcrypt from "bcrypt";
import {v6 as uuidv6} from 'uuid';

export async function registration(req, res) {
    try {
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
            message: 'Ошибка регистрации'
        });
    }
}

export async function confirmRegistration(req, res) {
    try {
        const {
            hashlink
        } = req.params;
        console.log(hashlink)
        const user = await queries.auth.updateActiveUserByHashLink(hashlink);
        console.log(user)
        return res.json({
            message: 'Аккаунт подтвержден'
        });
    } catch (e) {
        return res.json({
            error: e,
            message: 'Ошибка подтверждения'
        });
    }
}
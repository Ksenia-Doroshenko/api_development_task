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

        console.log(newUser)

        return res.json({
            message: 'Регистрация прошла успешно'
        });
    } catch (e) {
        return res.json({
            message: 'Ошибка регистрации'
        });
    }
}
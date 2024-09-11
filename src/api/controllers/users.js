import {queries} from '../index.js';
import {getObjectByFields} from "../../utils/getObjectByFields.js";
import {upload} from "../../utils/fs_handlers.js";

export async function getFullUserDataByNamePrisma(req, res) {
    try {
        const fullUserData = await queries.users.getFullUserDataByNamePrisma(req.params.name);
        res.json(fullUserData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function getFullUserDataByName(req, res) {
    try {
        const fullUserData = await queries.users.getFullUserDataByName(req.params.name);
        res.json(fullUserData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function postFullUserDataByName(req, res) {
    try {
        res.json(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function updateUserData(req, res) {
    try {
        const updatedUserData = await queries.users.updateUserData({
            id_user: req.auth.id,
            name: req.body.name
        });
        res.json(getObjectByFields(updatedUserData, ['id', 'name', 'email']));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function uploadAvatar(req, res) {
    upload.single('avatar')(req, res, async (err) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Server error');
        }
        if (!req.file) {
            return res.status(400).json({message: 'Файл не загружен'});
        }

        const fileName = req.file.filename;

        try {
            const updatedUser = await queries.users.updateUserAvatar({
                id_user: req.auth.id,
                avatar: fileName
            });
            res.json({message: 'Аватар успешно загружен'});
        } catch (error) {
            console.error('Ошибка обновления аватара:', error);
            res.status(500).send('Server error');
        }
    });
}

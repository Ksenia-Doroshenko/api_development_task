import {queries} from '../index.js';
import {getObjectByFields} from "../../utils/getObjectByFields.js";

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


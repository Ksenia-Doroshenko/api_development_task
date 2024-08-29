import {queries} from '../index.js';

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


import {queries} from '../index.js';

export async function getFullUserDataByNamePrisma(req, res) {
    try {
        const fullUserData = await queries.users.getFullUserDataByNamePrisma(name);
        res.send(fullUserData)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function getFullUserDataByName(req, res) {
    try {
        const fullUserData = await queries.users.getFullUserDataByName(name);
        res.send(fullUserData)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}
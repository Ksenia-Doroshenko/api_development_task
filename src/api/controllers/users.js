import { queries } from '../index.js';

async function getFullUserDataByNamePrisma(req, res) {
    try {
        const fullUserData = await queries.users.getFullUserDataByNamePrisma(req.params.name);
        res.send(fullUserData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

async function getFullUserDataByName(req, res) {
    try {
        const fullUserData = await queries.users.getFullUserDataByName(req.params.name);
        res.send(fullUserData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export {
    getFullUserDataByName,
    getFullUserDataByNamePrisma
};
import { queries } from '../index.js';

async function getTagsAndModelsPrisma(req, res) {
    try {
        const data = await queries.tagModel.getTagsAndModelsPrisma(req.params.name);
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

async function getTagsAndModels(req, res) {
    try {
        const data = await queries.tagModel.getTagsAndModels(req.params.name);
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export {
    getTagsAndModelsPrisma,
    getTagsAndModels
};
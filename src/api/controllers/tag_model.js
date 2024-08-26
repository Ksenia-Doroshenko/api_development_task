import {queries} from '../index.js';

export async function getTagsAndModelsPrisma(req, res) {
    try {
        const data = await queries.tagModel.getTagsAndModelsPrisma(name);
        res.send(data)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function getTagsAndModels(req, res) {
    try {
        const data = await queries.tagModel.getTagsAndModels(name);
        res.send(data)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}
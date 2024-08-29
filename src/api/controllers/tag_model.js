import {queries} from '../index.js';

export async function getTagsAndModelsPrisma(req, res) {
    try {
        const data = await queries.tagModel.getTagsAndModelsPrisma(req.params.name);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}


export async function getTagsAndModels(req, res) {
    try {
        const data = await queries.tagModel.getTagsAndModels(req.params.name);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}

export async function postTagsAndModels(req, res) {
    try {
        res.json(req.body);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
}


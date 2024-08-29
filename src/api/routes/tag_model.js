import {Router} from 'express';
import {controllers} from '../index.js';

const tagModelRouter = Router();

tagModelRouter.get('/prisma_tag_model', controllers.tagModel.getTagsAndModelsPrisma);
tagModelRouter.post('/prisma_tag_model', controllers.tagModel.postTagsAndModels);

tagModelRouter.get('/tag_model', controllers.tagModel.getTagsAndModels);
tagModelRouter.post('/tag_model', controllers.tagModel.postTagsAndModels);

export { tagModelRouter };
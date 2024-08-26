import {controllers} from '../index.js'
import bodyParser from "body-parser";
import {Router} from "express";

const tagModelRouter = Router();
tagModelRouter.use(bodyParser.json());

tagModelRouter.get('/prisma_tag_model', controllers.tagModel.getTagsAndModelsPrisma);
tagModelRouter.post('/prisma_tag_model', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

tagModelRouter.get('/tag_model', controllers.tagModel.getTagsAndModels);
tagModelRouter.post('/tag_model', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

export default tagModelRouter;
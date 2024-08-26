import {exampleDbPrisma} from './index.js';
import {exampleDb} from "./index.js";
export async function getTagsAndModelsPrisma(name){
    const data = await exampleDbPrisma.tag.findMany({
        select: {
            name: true,
            model_tag: {
                select: {
                    model: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    return(data);
}
export async function getTagsAndModels(name){
    const query = `
            select t.name as tag_name, m.name as model_name
            from tag t
            join model_tag mt on t.id = mt.id_tag 
            join model m on mt.id_model = m.id
        `;
    const data = await exampleDb.any(query);
    return(data);
}
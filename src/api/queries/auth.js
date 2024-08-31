import {exampleDbPrisma} from './index.js';

export async function createNewUser(body) {
    const fullUserData = await exampleDbPrisma.users.create({
        data: {
            name: body.name, email: body.email, pass: body.pass, hashlink: body.hashlink
        }
    });
    return (fullUserData);
}
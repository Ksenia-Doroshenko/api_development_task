import {exampleDbPrisma} from './index.js';

export async function createNewUser(body) {
    const userData = await exampleDbPrisma.users.create({
        data: {
            name: body.name, email: body.email, pass: body.pass, hashlink: body.hashlink
        }
    });
    return (userData);
}

export async function updateActiveUserByHashLink(hashlink) {
    console.log(hashlink)
    const userData = await exampleDbPrisma.users.updateMany({
        data: {
            flag_activation: true
        },
        where: {
            hashlink: hashlink
        }
    });
    return (userData);
}
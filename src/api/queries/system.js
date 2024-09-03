import {exampleDbPrisma} from "./index.js";

export async function createNewUser(body) {
    const userData = await exampleDbPrisma.users.create({
        data: {
            name: body.name, email: body.email, pass: body.pass,
            hashlink: body.hashlink
        }
    });
    return (userData);
}

export async function updateActiveUserByHashlink(hashlink) {
    const userData = await exampleDbPrisma.users.updateMany({
        data: {
            flag_activation: true,
            hashlink: null
        },
        where: {
            hashlink
        }
    });
    return (userData);
}

export async function getUserByEmail(email) {
    const user = await exampleDbPrisma.users.findUnique({
        where: {
            email
        }
    });
    return (user);
}

export async function getUserByRefreshToken(refreshToken) {
    const user = await exampleDbPrisma.users.findFirst({
        where: {
            refresh_token: refreshToken
        }
    });
    return (user);
}

export async function setUserRefreshToken(id, refreshToken) {
    const user = await exampleDbPrisma.users.update({
        where: {
            id
        },
        data: {
            refresh_token: refreshToken
        }
    });
    return (user);
}


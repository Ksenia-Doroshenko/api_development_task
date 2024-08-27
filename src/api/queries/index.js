import * as users from './users.js';
import * as tagModel from './tag_model.js';
import pgp from "pg-promise";
import { PrismaClient } from '@prisma/client';


const exampleDbPrisma = new PrismaClient();
const exampleDb = pgp()("postgres://postgres:qbz56@localhost:5432/postgres");

export {
    users,
    tagModel,
    exampleDbPrisma,
    exampleDb
};
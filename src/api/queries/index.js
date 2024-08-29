export * as users from './users.js';
export * as tagModel from './tag_model.js';
import pgp from "pg-promise";
import {PrismaClient} from '@prisma/client';


export const exampleDbPrisma = new PrismaClient();
export const exampleDb = pgp()("postgres://postgres:1@localhost:5432/postgres");
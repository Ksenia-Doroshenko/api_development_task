const router = require('../routes');

const users = require('./users.js');
const tagModel = require('./tag_model.js');

const pgp = require("pg-promise")();
const {PrismaClient} = require('@prisma/client');

const exampleDbPrisma = new PrismaClient();
const exampleDb = pgp("postgres://postgres:1@localhost:5432/postgres");

module.exports = {
    exampleDbPrisma,
    exampleDb
};


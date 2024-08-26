const express = require("express");
const pgp = require("pg-promise")();
const bodyParser = require('body-parser');

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
const port = 8000;

const db = pgp("postgres://postgres:1@localhost:5432/postgres");

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')

});


app.get('/prisma_user_a', async function (req, res) {
    try {
        const smt = await prisma.users.findMany({
            where: {
                name: 'A',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: {
                        id: true,
                    }
                },
                model_model_id_user_creatorTousers: {
                    select: {
                        name: true,
                        users_model_id_user_creatorTousers: {
                            select: {
                                name: true,
                            }
                        },
                        users_model_id_user_approvedTousers: {
                            select: {
                                name: true,
                            }
                        },
                        tool: {
                            select: {
                                name: true,
                            }
                        },
                        status: {
                            select: {
                                name: true,
                            }
                        },
                        section: {
                            select: {
                                name: true,
                            }
                        }
                    },
                },
                model_model_id_user_approvedTousers: {
                    select: {
                        name: true,
                        users_model_id_user_creatorTousers: {
                            select: {
                                name: true,
                            }
                        },
                        users_model_id_user_approvedTousers: {
                            select: {
                                name: true,
                            }
                        },
                        tool: {
                            select: {
                                name: true,
                            }
                        },
                        status: {
                            select: {
                                name: true,
                            }
                        },
                        section: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        });
        res.send(smt)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.post('/prisma_user_a', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

app.get('/user-a', async (req, res) => {
    try {
        const query = `
            select u.id as user_id, 
            u.name as user_name, 
            u.email as user_email,
            r.name as role_name,
            m.name as model_name,
            u_creator.name as creator_name,
            u_approved.name as approved_name,
            t.name as tool_name,
            stat.name as status_name,
            sec.name as section_name
            from 
            users u 
            left join role r on u.id_role = r.id
            left join model m on u.id = m.id_user_creator or u.id = m.id_user_approved
            left join users u_creator on u_creator.id = m.id_user_creator
            left join users u_approved on u_approved.id = m.id_user_approved
            left join tool t on t.id = m.id_tool
            left join status stat on m.id_status = stat.id 
            left join section sec on m.id_section = sec.id
            where u.name = 'A'
        `;
        const data = await db.any(query);

        const userA = {
            user_id: data[0].user_id,
            user_name: data[0].user_name,
            user_email: data[0].user_email,
            role_name: data[0].role_name,
            models: data.map(item => ({
                model_name: item.model_name,
                creator_name: item.creator_name,
                approved_name: item.approved_name,
                tool_name: item.tool_name,
                status_name: item.status_name,
                section_name: item.section_name
            }))
        }
        res.json(userA);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.post('/user-a', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

app.get('/tag-model', async (req, res) => {
    try {
        const query = `
            select t.name as tag_name, m.name as model_name
            from tag t
            join model_tag mt on t.id = mt.id_tag 
            join model m on mt.id_model = m.id
        `;
        const data = await db.any(query);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.post('/tag-model', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

app.get('/prisma__tag-model', async function (req, res) {
    try {
        const smt = await prisma.tag.findMany({
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
        res.send(smt)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

app.post('/prisma__tag-model', (req, res) => {
    console.log(req.body)
    res.json(req.body)
});

app.listen(port, () => {
    console.log("Server is listening on 8000")
});


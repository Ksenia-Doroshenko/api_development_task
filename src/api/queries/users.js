import { exampleDbPrisma, exampleDb } from './index.js';
async function getFullUserDataByNamePrisma(name) {
    const fullUserData = await exampleDbPrisma.users.findMany({
        where: {
            name: name,
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
    return (fullUserData);
}

async function getFullUserDataByName(name) {
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
            where u.name = '${name}'
        `;
    const data = await exampleDb.any(query);

    const fullUserData = {
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
    return (fullUserData);
}

export {
    getFullUserDataByName,
    getFullUserDataByNamePrisma
}
import knex from 'knex'
import 'dotenv/config'
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')
const connection = knex(configuration[environment])

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
    },
    useNullAsDefault: true
})

export default db
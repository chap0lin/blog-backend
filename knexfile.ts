import path from 'path'
import 'dotenv/config'

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
    },
    migrations: {
        directory: path.resolve(__dirname, 'dist', 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'dist', 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}
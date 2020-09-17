import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('thumbnail').notNullable();
        table.string('description').notNullable();
        table.string('author').notNullable();
        table.string('read_time').notNullable(); //in minutes
        table.text('content').notNullable();
        table.timestamp('inserted_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('posts')
}
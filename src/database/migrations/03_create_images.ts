import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('images', table => {
        table.increments('id').primary();
        table.string('original_name').notNullable();
        table.string('url').notNullable();
        table.timestamp('inserted_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('images')
}
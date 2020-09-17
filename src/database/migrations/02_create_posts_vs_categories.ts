import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('posts_vs_categories', table => {
        table.increments('id').primary();
        table.integer('post_id')
            .notNullable()
            .references('id')
            .inTable('posts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        
        table.integer('category_id')
            .notNullable()
            .references('id')
            .inTable('categories')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('posts_vs_categories')
}
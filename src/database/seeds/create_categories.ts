import Knex from 'knex'

export async function seed(knex: Knex){
    await knex('categories').insert([
        {title: 'Programação'},
        {title: 'Design'},
        {title: 'Música'},
        {title: 'Gestão'},
        {title: 'Fitness'},
    ])
}

import {Request, Response} from 'express'
import knex from '../database/connection'

export default class CategoriesController{
    async index(request: Request, response: Response){
        const categories = await knex('categories').select('*');
        return response.json(categories)
    }
}
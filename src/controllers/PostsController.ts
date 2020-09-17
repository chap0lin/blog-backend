import { Kinesis } from 'aws-sdk';
import {Request, Response} from 'express'
import knex from '../database/connection'

export default class PostsController{
    async index(request: Request, response: Response){
        const posts = await knex('posts')
            .innerJoin('posts_vs_categories', 'posts_vs_categories.post_id', '=', 'posts.id')
            .innerJoin('categories', 'posts_vs_categories.category_id', '=', 'categories.id')
            .select('posts.id', 'posts.title', 'posts.thumbnail', 'categories.title as category', 'posts.description', 'posts.inserted_at');
        return response.json(posts)
    }
    async show(request: Request, response: Response){
        const {id} = request.params
        const posts = await knex('posts').select('*').where('id', '=', id)
        return response.json(posts)
    }
    async create(request: Request, response: Response){
        const {
            title,
            thumbnail,
            description,
            author,
            read_time,
            content,
            categories
        } = request.body
        console.log(request.body)
        const trx = await knex.transaction()
        const post = {
            title, 
            thumbnail,
            description,
            author,
            read_time,
            content
        }
        //create post
        const postId = await trx('posts').insert(post).returning('id')
        // const aux = await trx('posts').insert({
        //     title, 
        //     thumbnail,
        //     description,
        //     author,
        //     read_time,
        //     content
        // })
        //const postId = aux[0]
        //create category_vs_post -- refazer
        var categoryVsPostItem
        if(false && categories.length>1){
            categories.map(async (category: Number) => {
                categoryVsPostItem.push({
                    post_id: postId[0],
                    category_id: category
                })
            })
        }else{
            categoryVsPostItem = {
                post_id: postId[0],
                category_id: categories
            }
        }
        if(categoryVsPostItem)
            await trx('posts_vs_categories').insert(categoryVsPostItem)
            
        await trx.commit()
        //return json
        return response.status(200).send()
    }
    async delete(request: Request, response: Response){
        const {id} = request.params
        const trx = await knex.transaction()
        //delete category_vs_post
        await trx('posts_vs_categories').where('post_id', '=', id).del()
        //delete post
        await trx('posts').where('id', '=', id).del()

        await trx.commit()
        //return json
        return response.status(200).send()
    }
}
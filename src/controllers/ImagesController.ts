import {Request, Response} from 'express'
import knex from '../database/connection'
import aws from 'aws-sdk'

const s3 = new aws.S3()

export default class ImagesController{
    async index(request: Request, response: Response){
        const images = await knex('images').select('*');
        const imagesWithUrl = images.map(image => {
            return {
                ...image,
                url: `https://s3.amazonaws.com/carlos.blog.test/${image.url}`
            }
        })
        return response.json(imagesWithUrl)
    }
    async create(request: Request, response: Response){
        const {originalname, filename} = request.file
        //get url - filename
        const inserted_at = await knex('images').insert({
            original_name: originalname,
            url: filename
        }).returning('inserted_at')
        //send back to user
        response.json({
            original_name: originalname,
            url: `https://s3.amazonaws.com/carlos.blog.test/${filename}`,
            inserted_at: inserted_at[0]
        })
    }
    async delete(request: Request, response: Response){
        const {id} = request.params
        
        const key = await knex('images').where('id', '=', id).del().returning('url')
        //const key = await knex('images').where('id', '=', id).del()
        console.log(key[0])
        //delete from s3
        s3.deleteObject({
            Bucket: process.env.BUCKET_NAME || '',
            Key: `${key[0]}`,
        }).promise().then(response=>{
            console.log(response)
        }).catch(response=>{
            console.log(response)
        })
        //return json
        response.json({
            "sucess": true
        })
    }
}
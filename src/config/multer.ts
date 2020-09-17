require('dotenv').config()
import multer, { FileFilterCallback } from 'multer'
import {Request} from 'express';
import path from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'

export default {
    /*storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback){
            const hash = crypto.randomBytes(6).toString('hex')

            const filename = `${hash}-${file.originalname}`

            callback(null, filename)
        }
    })*/
    storage: multerS3({
        s3: new aws.S3(),
        bucket: process.env.BUCKET_NAME || '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb)=>{
            crypto.randomBytes(16, (err, hash) =>{
                if(err) cb(err)

                file.filename = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.filename)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ]
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Invalid file type'))
        }
    }
}
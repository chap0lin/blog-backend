import express, {Request, Response} from 'express';

import multer from 'multer'
import multerConfig from './config/multer'

import CategoriesController from './controllers/CategoriesController'
const categoriesController = new CategoriesController()

import ImagesController from './controllers/ImagesController'
const imagesController = new ImagesController()

import PostsController from './controllers/PostsController'
const postsController = new PostsController()

const routes = express.Router();

const upload = multer(multerConfig)

routes.get('/images', imagesController.index)
routes.post('/images', upload.single('file'), imagesController.create)
routes.delete('/images/:id', imagesController.delete)

routes.get('/posts', postsController.index)
routes.post('/posts', postsController.create)
routes.get('/post/:id', postsController.show)
routes.delete('/post/:id', postsController.delete)

routes.get('/categories', categoriesController.index)

// index, show, create, update, delete

export default routes;
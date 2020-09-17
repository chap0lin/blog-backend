import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(routes)

//app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//console.log('Path uploads: ' + path.resolve(__dirname, '..', 'uploads'))
//app.use(errors())

app.listen(process.env.PORT || 3333)
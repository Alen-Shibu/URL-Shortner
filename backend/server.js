import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import urlRoutes from './routes/url.js'

const app = express();

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST'],
}))

app.get('/health',(_,res)=>{
    res.status(200).json({message:"ok"})
})

app.use('/',urlRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database connected')
    app.listen(process.env.PORT,()=>{
        console.log('app is running')
    })
}).catch((err)=>{
    console.log('Error in connecting to mongoDB',err)
})
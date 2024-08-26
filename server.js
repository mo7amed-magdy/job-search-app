process.on('uncaughtException',(err)=>{
    console.log("err",err);
})

import express from 'express'
const app = express()
const port = 3000

import { dbConnection } from './databases/dbConnection.js'
import { AppError } from './src/utils/appError.js'
import dotenv from 'dotenv'
import userRouter from './src/modules/user/user.routes.js';
import companyRouter from './src/modules/company/company.routes.js';
import jobRouter from './src/modules/job/job.routes.js';

dotenv.config()
dbConnection()
app.use(express.json())
app.use(userRouter)
app.use(companyRouter)
app.use(jobRouter)



app.use('*',(req,res,next)=>{
    next(new AppError(`connot find endPoint ${req.originalUrl}`, 404))
})
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({error:err.message,stack:err.stack})
})
process.on('unhandledRejection',(err)=>{
    console.log("err",err);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
import express from 'express';
import colors from 'colors';

import dotenv  from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
//configure env
dotenv.config()
//database config
connectDB();
//rest object

const app = express()
//middelwares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use('/api/v1/auth', authRoutes);

//rest api

app.get('/' , (req,res)=> {

res.send('<h1> Welcome to Ecommerce app </h1>');



});
//port
const PORT = process.env.PORT || 10000;
//RUN LISTEN
app.listen(PORT, ()=>{
console.log(`server runing on${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
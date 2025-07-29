import { configDotenv } from 'dotenv';
import express from 'express'
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongoConfig.bd.js';
const PORT = 3000
// configDotenv.config("/env")

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello form the expres")
})

app.post('/api/create',(req,res)=>{
    const {url} = req.body
    console.log(url);
    
    res.send(nanoid(10))
})

app.listen(PORT,()=>{
    console.log(`Server is listen on ${PORT}`)
})
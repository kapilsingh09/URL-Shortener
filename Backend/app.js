import express from 'express'

const app = express()
const PORT = 3000

app.get('/',(req,res)=>{
    res.send("Hello form the expres")
})

app.listen(PORT,()=>{
    console.log(`Server is listen on ${PORT}`)
})
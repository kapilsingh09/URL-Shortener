import { configDotenv } from 'dotenv';
import express from 'express'
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongoConfig.bd.js';
import urlSchema from './src/model/shorturl.model.js';
const PORT = 3000
// configDotenv.config("/env")

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello form the expres")
})

app.post('/api/create', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        const shortUrl = nanoid(9);

       
        const newUrl = new urlSchema({
            full_url: url,      
            short_url: shortUrl 
        });

     
        await newUrl.save();

       
        res.status(201).json({
            message: "Short URL created successfully",
            data: {
                full_url: newUrl.full_url,
                short_url: newUrl.short_url
            }
        });

    } catch (error) {
        console.error("Error saving to database:", error);
        res.status(500).json({ error: "Failed to create short URL" });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const url = await urlSchema.findOne({ short_url: id });
        if (url) {
            res.redirect(url.full_url);
        } else {
            res.status(404).send("not found");
        }
    } catch (error) {
        console.error("Error fetching from database:", error);
        res.status(500).send("Internal server error");
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is listen on ${PORT}`)
})
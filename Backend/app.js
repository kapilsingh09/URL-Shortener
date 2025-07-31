import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongoConfig.bd.js";
import urlSchema from "./src/model/shorturl.model.js";
import shortUrlRouter from "./src/routes/shorturl.route.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
    res.send("Hello from Express");
});

// Route 
app.use("/api/create", shortUrlRouter);

// Redirection route
app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const url = await urlSchema.findOne({ short_url: id });

        if (url) {
            res.redirect(url.full_url);
        } else {
            res.status(404).send("Short URL not found");
        }
    } catch (error) {
        console.error("Error fetching from database:", error);
        res.status(500).send("Internal server error");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

import { createShortUrl_Without_User_Servie } from "../services/shorturl.services.js";

// This controller is for creating a short URL from a long URL.
// It expects the client to send a JSON body like: { "url": "https://example.com" }
export const createShortUrl = async (req, res) => {
    try {
        console.log("Request headers:", req.headers);
        console.log("Request body:", req.body);
        console.log("Content-Type:", req.headers['content-type']);
        
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({ 
                error: "Request body is missing. Please send JSON with 'url' field.",
                headers: req.headers,
                body: req.body
            });
        }
        
        const { url } = req.body;
        console.log("Received URL:", url);
        
        // Check if the user sent a URL in the request body
        if (!url) {
            // Friendly message for beginners
            return res.status(400).json({ 
                error: "Please provide a 'url' in the request body, e.g. { \"url\": \"https://example.com\" }",
                receivedBody: req.body
            });
        }

        // Call the service to create a short URL
        const shortUrl = await createShortUrl_Without_User_Servie(url);

        // If something went wrong in the service
        if (!shortUrl) {
            return res.status(500).json({ error: "Oops! Could not create a short URL. Please try again." });
        }

        // Build the full short URL to return to the user
        const appUrl = process.env.APP_URL || `http://localhost:3000`;
        res.status(201).json({
            message: "Yay! Short URL created successfully 🎉",
            data: {
                full_url: url,
                short_url: `${appUrl}/${shortUrl}`
            }
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error saving to database:", error);
        // Friendly error message
        res.status(500).json({ error: "Sorry, something went wrong while creating your short URL. Please try again later." });
    }
}
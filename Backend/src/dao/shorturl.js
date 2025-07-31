import urlSchema  from "../model/shorturl.model.js";

// This function saves a new short URL to the database.
// Humzie tip: If you pass a userId, it will be attached to the URL!
export const saveShotUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl
        });

        // If a userId is provided, attach it to the document
        if (userId) {
            newUrl.user = userId;
        }

        // Save the new URL document to the database
        await newUrl.save();
        // Optionally, you could return the saved document if you want!
        // return newUrl;
    } catch (error) {
        // Humzie/beginner friendly error log
        console.error("Error saving short URL to database:", error);
        // You could throw or handle the error here if needed
        throw error;
    }
}
import { generateNanoId } from "../utils/helper.utils.js";
import urlSchema from "../model/shorturl.model.js";
import { saveShotUrl } from "../dao/shorturl.js";

// This function creates a short URL for a given long URL (no user attached).
// It returns the short URL string if successful, or null if something is wrong.
// Humzie tip: Make sure you pass a valid URL string!
export const createShortUrl_Without_User_Servie = async (url) => {
    if (!url) {
        // Oops! You forgot to provide a URL. Please check your input.
        return null;
    }

    try {
        const shortUrl = generateNanoId(7); // 7 chars is a nice length!
        await saveShotUrl(shortUrl, url);
        return shortUrl;
    } catch (error) {
        // Something went wrong while saving. Don't worry, just try again!
        console.error("Error in createShortUrl_Without_User_Servie:", error);
        return null;
    }
}

// This function creates a short URL for a given long URL and attaches a user ID.
// It returns the short URL string if successful, or null if something is wrong.
// Humzie tip: Make sure both url and userId are provided!
export const createShortUrl_With_User_Servie = async (url, userId) => {
    if (!url) {
        // Oops! You forgot to provide a URL. Please check your input.
        return null;
    }

    try {
        const shortUrl = generateNanoId(7);
        await saveShotUrl(shortUrl, url, userId);
        return shortUrl;
    } catch (error) {
        // Something went wrong while saving. It's okay, just try again!
        console.error("Error in createShortUrl_With_User_Servie:", error);
        return null;
    }
}
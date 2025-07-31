import express from "express";
import { createShortUrl } from "../contorlers/shorturl.controlers.js";

const router = express.Router();

router.post('/', createShortUrl);

export default router;
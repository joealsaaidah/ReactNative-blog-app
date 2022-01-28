import express from "express";
import { createPost, latestPost } from "../controllers/post.js";
import multer from "../middlewares/multer.js";

const router = express.Router();

router.route("/create").post(multer.single("thumbnail"), createPost);
router.route("/latest").get(latestPost);

export default router;

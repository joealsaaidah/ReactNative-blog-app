import express from "express";
import { createPost, latestPost } from "../controllers/post.js";

const router = express.Router();

router.route("/create").post(createPost);
router.route("/latest").get(latestPost);

export default router;

import express from "express";
import { createPost, latestPost } from "../controllers/post.js";
import multer from "../middlewares/multer.js";
import { postValidator, validate } from "../middlewares/postValidator.js";

const router = express.Router();

router
  .route("/create")
  .post(multer.single("thumbnail"), postValidator, validate, createPost);
router.route("/latest").get(latestPost);

export default router;

import express from "express";
import { createPost, latestPost } from "../controllers/post.js";
import multer from "../middlewares/multer.js";
import { postValidator, validate } from "../middlewares/postValidator.js";

const router = express.Router();

router.route("/create").post(
  multer.single("thumbnail"),
  (req, res, next) => {
    const { tags } = req.body;
    if (tags) req.body.tags = JSON.parse(tags);
    console.log(typeof req.body.tags);
    next();
  },
  postValidator,
  validate,
  createPost
);
router.route("/latest").get(latestPost);

export default router;

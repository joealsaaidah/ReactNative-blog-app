import express from "express";
import { createPost } from "../controllers/post.js";
import multer from "../middlewares/multer.js";
import { parseData } from "../middlewares/parseDataHelper.js";
import { postValidator, validate } from "../middlewares/postValidator.js";

const router = express.Router();

router
  .route("/create")
  .post(
    multer.single("thumbnail"),
    parseData,
    postValidator,
    validate,
    createPost
  );

export default router;

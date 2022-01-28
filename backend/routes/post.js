import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getFeaturedPosts,
  getPosts,
} from "../controllers/post.js";
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
router
  .route("/:postId")
  .put(
    multer.single("thumbnail"),
    parseData,
    postValidator,
    validate,
    updatePost
  );

router.route("/:postId").delete(deletePost);
router.route("/single/:postId").get(getPost);
router.route("/featured-posts").get(getFeaturedPosts);
router.route("/posts").get(getPosts);

export default router;

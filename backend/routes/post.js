import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getFeaturedPosts,
  getPosts,
  seatchPost,
  getRelatedPosts,
  uploadImage,
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
router.route("/single/:slug").get(getPost);
router.route("/featured-posts").get(getFeaturedPosts);
router.route("/posts").get(getPosts);
router.route("/search").get(seatchPost);
router.route("/related-posts/:postId").get(getRelatedPosts);
router.route("/upload-image").post(multer.single("image"), uploadImage);

export default router;

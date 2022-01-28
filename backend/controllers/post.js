import cloudinary from "../config/cloudinary.js";
import FeaturedPost from "../models/featuredPost.js";
import Post from "../models/post.js";
import randomstring from "randomstring";

const FEATURED_POST_COUNT = 4;
const addToFeaturedPosts = async (postId) => {
  const isAlreadyExists = await FeaturedPost.findOne({ post: postId });

  if (isAlreadyExists) return;

  const featuredPost = new FeaturedPost({ post: postId });
  await featuredPost.save();

  const featuredPosts = await FeaturedPost.find({}).sort({ createdAt: -1 });
  featuredPosts.forEach(async (post, index) => {
    if (index >= FEATURED_POST_COUNT)
      await FeaturedPost.findByIdAndDelete(post._id);
  });
};

export const createPost = async (req, res) => {
  const { title, content, meta, tags, slug, author, featured } = req.body;
  const { file } = req;
  const isAlreadyExists = await Post.findOne({ slug });

  if (isAlreadyExists)
    return res.status(401).json({ error: "Please use a unique slug" });

  const newPost = new Post({ title, content, meta, tags, slug, author });

  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { public_id: `blog-app/posts/${randomstring.generate(15)}` }
    );
    newPost.thumbnail = { url: secure_url, public_id };
  }

  await newPost.save();

  if (featured) await addToFeaturedPosts(newPost._id);

  res.status(201).json({ message: "post Created", post: newPost });
};

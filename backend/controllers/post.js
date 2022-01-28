import cloudinary from "../config/cloudinary.js";
import FeaturedPost from "../models/featuredPost.js";
import Post from "../models/post.js";
import randomstring from "randomstring";
import prototype from "mongoose";
const { isValidObjectId } = prototype;

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

const removeFromFeaturedPosts = async (postId) => {
  await FeaturedPost.findOneAndDelete({ post: postId });
};

const isFeaturedPost = async (postId) => {
  const post = await FeaturedPost.findOne({ post: postId });
  return post ? true : false;
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

  res.status(201).json({
    message: "post Created",
    post: {
      id: newPost._id,
      title,
      meta,
      slug,
      thumbnail: newPost.thumbnail?.url,
      author: newPost.author,
    },
  });
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId))
    return res.status(401).json({ error: "Invalid request! " });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post Not Found! " });

  const public_id = post.thumbnail?.public_id;
  if (public_id) {
    const { result, error } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok")
      return res.status(404).json({ error: `Couldn't remove thumbnail` });
  }
  await Post.findByIdAndDelete(postId);
  await removeFromFeaturedPosts(postId);
  res.status(200).json({ message: "Post removed successfully!" });
};

export const updatePost = async (req, res) => {
  const { title, content, meta, tags, slug, author, featured } = req.body;
  const { file } = req;
  const { postId } = req.params;

  if (!isValidObjectId(postId))
    return res.status(401).json({ error: "Invalid request! " });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post Not Found! " });

  const public_id = post.thumbnail?.public_id;
  if (public_id && file) {
    const { result, error } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok")
      return res.status(404).json({ error: `Couldn't remove thumbnail` });
  }

  if (file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { public_id: `blog-app/posts/${randomstring.generate(15)}` }
    );

    post.thumbnail = { url: secure_url, public_id };
  }

  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;
  post.author = author;

  if (featured) await addToFeaturedPosts(post._id);
  else await removeFromFeaturedPosts(post._id);

  await post.save();

  res.status(201).json({
    message: "post Created",
    post: {
      id: post._id,
      title,
      meta,
      slug,
      thumbnail: post.thumbnail?.url,
      author: post.author,
      content,
      featured,
      tags,
    },
  });
};

export const getPost = async (req, res) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId))
    return res.status(401).json({ error: "Invalid request! " });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post Not Found! " });

  const featured = await isFeaturedPost(post._id);

  const { title, meta, author, slug, content, tags, createdAt } = post;

  res.status(201).json({
    message: "post Created",
    post: {
      id: post._id,
      title,
      meta,
      slug,
      thumbnail: post.thumbnail?.url,
      author,
      content,
      featured,
      tags,
      createdAt,
    },
  });
};

export const getFeaturedPost = async (req, res) => {
  const featuredPosts = await FeaturedPost.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("post");
  res.json({
    posts: featuredPosts.map(({ post }) => ({
      id: post._id,
      title: post.title,
      meta: post.meta,
      slug: post.slug,
      thumbnail: post.thumbnail?.url,
      author: post.author,
    })),
  });
};

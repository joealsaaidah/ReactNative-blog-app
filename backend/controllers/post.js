import FeaturedPost from "../models/featuredPost.js";
import Post from "../models/post.js";

const FEATURED_POST_COUNT = 4;
const addToFeaturedPosts = async (postId) => {
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
  const newPost = new Post({ title, content, meta, tags, slug, author });
  await newPost.save();
  if (featured) await addToFeaturedPosts(newPost._id);

  res.status(201).json({ message: "post Created", post: newPost });
};
export const latestPost = (req, res) => {
  res.send("Latest route");
};

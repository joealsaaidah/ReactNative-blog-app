import Post from "../models/post.js";

export const createPost = async (req, res) => {
  const { title, content, meta, tags, slug, author } = req.body;
  const newPost = new Post({ title, content, meta, tags, slug, author });
  await newPost.save();
  res.status(201).json({ message: "post Created", post: newPost });
};
export const latestPost = (req, res) => {
  res.send("Latest route");
};

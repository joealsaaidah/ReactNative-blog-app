import Post from "../models/post.js";

export const createPost = (req, res) => {
  const { title, content, meta, tags, slug, author } = req.body;
  console.log(req.file);
  const newPost = new Post({ title, content, meta, tags, slug, author });

  res.status(201).json({ message: "post Created", post: newPost });
};
export const latestPost = (req, res) => {
  res.send("Latest route");
};

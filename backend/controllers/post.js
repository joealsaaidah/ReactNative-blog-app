import Post from "../models/post.js";

export const createPost = (req, res) => {
  res.send("Post route");
};
export const latestPost = (req, res) => {
  res.send("Latest route");
};

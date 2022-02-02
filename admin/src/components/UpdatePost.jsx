import React, { useEffect, useState } from "react";
import PostForm from "./PostForm";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import NotFound from "./NotFound";

const UpdatePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);

  const { slug } = useParams();
  const { updateNotification } = useNotification();

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    }
    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  const submitHandler = async (formData) => {
    setBusy(true);
    console.log("id:", postInfo.id, "data:", formData.get("title"));
    const { post, error } = await updatePost(postInfo.id, formData);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (notFound) return <NotFound />;
  return (
    <PostForm
      onSubmit={submitHandler}
      initialPost={postInfo}
      postBtnTitle='Update'
      busy={busy}
      resetAfterSubmit
    />
  );
};

export default UpdatePost;

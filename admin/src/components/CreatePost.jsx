import React, { useEffect, useState } from "react";
import { createPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import PostForm, { defaultPost } from "./PostForm";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);

  const navigate = useNavigate();
  const submitHandler = async (formData) => {
    setBusy(true);
    const { post, error } = await createPost(formData);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setResetAfterSubmit(true);
    navigate(`/update-post/${post.slug}`);
  };

  useEffect(() => {
    const localPost = localStorage.getItem("blogPost");
    if (!localPost) return;
    const oldPost = JSON.parse(localPost);
    setPostInfo({ ...defaultPost, ...oldPost });
  }, []);

  return (
    <PostForm
      onSubmit={submitHandler}
      busy={busy}
      initialPost={postInfo}
      postBtnTitle={"Post"}
      resetAfterSubmit={resetAfterSubmit}
    />
  );
};

export default CreatePost;

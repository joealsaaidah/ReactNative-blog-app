import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/post";
import { useSearch } from "../context/SearchProvider";
import PostCard from "./PostCard";

let pageNo = 0;
let POST_LIMIT = 9;

//Pagination
const getPaginationCount = (postsCount) => {
  const result = postsCount / POST_LIMIT;
  return Math.ceil(result);
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(null);

  const { searchResult } = useSearch();

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);
    if (error) return console.log(error);
    setPosts(posts);
    setTotalPostCount(postCount);
  };

  //pagination
  const paginationCount = getPaginationCount(totalPostCount);
  const paginationArray = [...Array(paginationCount).keys()];
  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts();
  };

  const deleteHandler = async (postId) => {
    const confirmed = window.confirm("Are you sure!");
    if (!confirmed) return;
    const { error, message } = await deletePost(postId);
    if (error) return console.log(error);
    console.log(message);
    const newPosts = posts.filter((p) => p.id !== postId);
    setPosts(newPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log("searchResult", searchResult);
  }, [searchResult]);

  return (
    <div>
      <div className='grid grid-cols-3 gap-3 pb-5'>
        {searchResult.length
          ? searchResult.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                deleteHandler={() => deleteHandler(post.id)}
              />
            ))
          : posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                deleteHandler={() => deleteHandler(post.id)}
              />
            ))}
      </div>
      {paginationArray.length > 1 && !searchResult.length ? (
        <div className='flex items-center justify-center py-5 space-x-3'>
          {paginationArray.map((_, index) => (
            <button
              key={index}
              onClick={() => fetchMorePosts(index)}
              className={
                index === pageNo
                  ? "text-blue-500 border-b-2 border-b-blue-500  "
                  : "text-gray-500"
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Home;

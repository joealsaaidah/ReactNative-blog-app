import React, { useEffect, useState } from "react";
import { getPosts } from "../api/post";
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className='flex items-center justify-center py-5 space-x-3'>
        {paginationArray &&
          paginationArray.map((_, index) => (
            <button
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
    </div>
  );
};

export default Home;

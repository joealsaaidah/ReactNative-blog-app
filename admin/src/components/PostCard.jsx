import React from "react";
import dateFormat from "dateformat";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const PostCard = ({ post, deleteHandler }) => {
  if (!post) return null;
  const { title, thumbnail, tags, meta, createdAt, slug } = post;

  return (
    <div className='flex flex-col bg-white rounded shadow-sm'>
      <img
        className='aspect-video'
        src={thumbnail || "./blank.jpg"}
        alt='post'
      />
      <div className='flex flex-col justify-between flex-1 p-2'>
        <h1 className='text-lg font-semibold text-gray-700'>{title}</h1>
        <p className='text-gray-500 truncate'>{meta}</p>
        <div className='flex justify-between py-2'>
          <p className='text-sm text-gray-500 '>
            {dateFormat(createdAt, "mediumDate")}
          </p>
          <p className='text-sm text-gray-500'>{tags.join(", ")}</p>
        </div>
        <div className='flex space-x-3'>
          <Link
            to={`/update-post/${slug}`}
            className='flex items-center justify-center w-8 h-8 text-white bg-blue-400 rounded-full hover:bg-blue-600'
          >
            <BsFillPencilFill />
          </Link>
          <button
            onClick={deleteHandler}
            className='flex items-center justify-center w-8 h-8 text-white bg-red-400 rounded-full hover:bg-red-600'
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

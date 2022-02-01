import React from "react";
import {
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
  ImSpinner11,
} from "react-icons/im";

const mdRules = [
  {
    title: "From h1 to h6",
    rule: "# Heading -> ###### Heading",
  },
  {
    title: "Blockquote",
    rule: "> Your Quote",
  },
  {
    title: "Image",
    rule: "![image alt] (http://image_url.com)",
  },
  {
    title: "link",
    rule: "[Link Text](http://your_link.com",
  },
];

const CreatePost = () => {
  return (
    <form className='flex p-2'>
      {/* Left Side */}
      <div className='flex flex-col w-9/12 h-screen space-y-3'>
        {/* Title and  Submit*/}
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-gray-700'>
            Create New Post
          </h1>
          <div className='flex items-center space-x-5'>
            <button className='flex items-center h-10 px-3 space-x-2 text-blue-500 transition rounded hover:text-white hover:bg-blue-500 ring-1 ring-blue-500'>
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button className='flex items-center h-10 px-3 space-x-2 text-blue-500 transition rounded hover:text-white hover:bg-blue-500 ring-1 ring-blue-500'>
              <ImEye />
              <span>View</span>
            </button>
            <button className='h-10 px-5 text-white transition bg-blue-500 rounded hover:text-blue-500 ring-blue-500 hover:bg-transparent hover:ring-1 w-36'>
              Post
            </button>
          </div>
        </div>
        {/* Featured Checkbox */}
        <div>
          <input id='featured' type='checkbox' hidden />
          <label
            className='flex items-center space-x-2 text-gray-700 cursor-pointer group'
            htmlFor='featured'
          >
            <div className='flex items-center justify-center w-4 h-4 border-2 border-gray-700 rounded-full group-hover:border-blue-500'>
              <div className='w-2 h-2 bg-gray-700 rounded-full group-hover:bg-blue-500 ' />
            </div>
            <span className='group-hover:text-blue-500'>Featrued</span>
          </label>
        </div>
        {/* Title input */}
        <input
          className='w-full p-2 text-xl font-semibold rounded outline-none focus:ring-1 '
          placeholder='Post title'
          type='text'
        />
        {/* image input  */}
        <div className='flex space-x-2'>
          <div>
            <input id='image-input' type='file' hidden />
            <label
              htmlFor='image-input'
              className='flex items-center h-10 px-3 space-x-2 text-gray-700 transition rounded cursor-pointer hover:text-white hover:bg-gray-700 ring-1 ring-gray-700'
            >
              <span>PLace image</span>
              <ImFilePicture />
            </label>
          </div>

          <div className='flex items-center justify-between flex-1 overflow-hidden bg-gray-400 rounded'>
            <input
              className='w-full px-2 text-white bg-transparent'
              type='text'
              value='my name is yousef i am 32 years old, living in malaysia'
              disabled
            />

            <button className='flex flex-col items-center self-stretch justify-center p-1 text-xs text-white bg-gray-700'>
              <ImFilesEmpty />
              <span>copy</span>
            </button>
          </div>
        </div>
        <textarea
          className='flex-1 w-full p-2 font-mono text-lg tracking-wide rounded outline-none resize-none focus:ring-1'
          placeholder='## Markdown'
        ></textarea>

        {/* Tags input */}
        <div>
          <label htmlFor='tags'>Tags</label>
          <input
            id='tags'
            className='w-full p-2 rounded outline-none focus:ring-1 '
            placeholder='Post title'
            type='text'
          />
        </div>
        {/* meta description input */}
        <div>
          <label htmlFor='meta'>Meta description</label>
          <textarea
            id='meta'
            className='w-full p-2 rounded outline-none resize-none h-28 focus:ring-1'
            placeholder='Meta description'
          ></textarea>
        </div>
      </div>
      {/* Right Side */}
      <div className='relative w-1/4 px-2 '>
        <h1 className='mb-2 text-xl font-semibold text-gray-700'>Thumbnail</h1>
        {/* Image Input */}
        <div>
          <input id='thumbnail' type='file' hidden />
          <label className='cursor-pointer' htmlFor='thumbnail'>
            <div className='flex flex-col items-center justify-center text-gray-500 border border-gray-500 border-dashed aspect-video'>
              <span>Select thumbnail</span>
              <span className='text-xs'>Recommended size</span>
              <span className='text-xs'>1280 * 720</span>
            </div>
          </label>
        </div>
        {/* Markdown cheat sheet */}
        <div className='absolute px-2 py-4 -translate-y-1/2 bg-white top-1/2'>
          <h1 className='font-semibold text-center'>General markdown rules</h1>
          <ul className='space-y-2'>
            {mdRules.map(({ title, rule }) => (
              <li key={title}>
                <p className='font-semibold text-gray-500'>{title}</p>
                <p className='pl-2 font-mono font-semibold text-gray-700'>
                  {rule}
                </p>
              </li>
            ))}
            <li className='text-center text-blue-500'>
              <a
                href='https://www.markdownguide.org/basic-syntax/'
                target='_blank'
                rel='noreferrer'
              >
                Find out more
              </a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;

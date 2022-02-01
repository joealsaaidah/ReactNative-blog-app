import React, { useState } from "react";
import {
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
  ImSpinner11,
  ImSpinner3,
} from "react-icons/im";
import { uploadImage } from "../api/post";
import { useNotification } from "../context/NotificationProvider";

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

const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
};

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");
  const [imageUrlToCopy, setImageUrlToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const { title, featured, content, tags, meta } = postInfo;
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;

    //thumbnail clicked
    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image")) {
        return updateNotification("error", "this is not an image!");
      }
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }
    //featured clicked
    if (name === "featured") {
      return setPostInfo({ ...postInfo, [name]: checked });
    }
    //tags
    if (name === "tags") {
      const newTags = tags.split(",");
      if (newTags.length > 4)
        updateNotification("warning", "Only the first 4 tags will be selected");
    }
    //meta
    if (name === "meta" && meta.length >= 150) {
      return setPostInfo({ ...postInfo, [meta]: value.substring(0, 149) });
    }

    setPostInfo({ ...postInfo, [name]: value });
  };

  const imageUploadHandler = async ({ target }) => {
    if (imageUploading) return;

    const file = target.files[0];
    if (!file.type?.includes("image")) {
      return updateNotification("error", "this is not an image!");
    }

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    const { error, image } = await uploadImage(formData);
    setImageUploading(false);

    if (error) return console.log(error);
    setImageUrlToCopy(image);
  };

  const onCopyHandler = () => {
    const textToCopy = `![Add image description] (${imageUrlToCopy})`;
    navigator.clipboard.writeText(textToCopy);
  };

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
            <button
              type='button'
              className='flex items-center h-10 px-3 space-x-2 text-blue-500 transition rounded hover:text-white hover:bg-blue-500 ring-1 ring-blue-500'
            >
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button
              type='button'
              className='flex items-center h-10 px-3 space-x-2 text-blue-500 transition rounded hover:text-white hover:bg-blue-500 ring-1 ring-blue-500'
            >
              <ImEye />
              <span>View</span>
            </button>
            <button className='h-10 px-5 text-white transition bg-blue-500 rounded hover:text-blue-500 ring-blue-500 hover:bg-transparent hover:ring-1 w-36'>
              Post
            </button>
          </div>
        </div>
        {/* Featured Checkbox */}
        <div className='flex'>
          <input
            name='featured'
            onChange={handleChange}
            id='featured'
            type='checkbox'
            hidden
          />
          <label
            className='flex items-center space-x-2 text-gray-700 cursor-pointer select-none group'
            htmlFor='featured'
          >
            <div className='flex items-center justify-center w-4 h-4 border-2 border-gray-700 rounded-full group-hover:border-blue-500'>
              {featured && (
                <div className='w-2 h-2 bg-gray-700 rounded-full group-hover:bg-blue-500 ' />
              )}
            </div>
            <span className='group-hover:text-blue-500'>Featrued</span>
          </label>
        </div>
        {/* Title input */}
        <input
          value={title}
          name='title'
          className='w-full p-2 text-xl font-semibold rounded outline-none focus:ring-1 '
          placeholder='Post title'
          type='text'
          onChange={handleChange}
        />
        {/* image input  */}
        <div className='flex space-x-2'>
          <div>
            <input
              onChange={imageUploadHandler}
              id='image-input'
              type='file'
              hidden
            />
            <label
              htmlFor='image-input'
              className='flex items-center h-10 px-3 space-x-2 text-gray-700 transition rounded cursor-pointer hover:text-white hover:bg-gray-700 ring-1 ring-gray-700'
            >
              <span>PLace image</span>
              {!imageUploading ? (
                <ImFilePicture />
              ) : (
                <ImSpinner3 className='animate-spin' />
              )}
            </label>
          </div>

          {imageUrlToCopy && (
            <div className='flex items-center justify-between flex-1 overflow-hidden bg-gray-400 rounded'>
              <input
                className='w-full px-2 text-white bg-transparent'
                type='text'
                value={imageUrlToCopy}
                disabled
              />

              <button
                onClick={onCopyHandler}
                type='button'
                className='flex flex-col items-center self-stretch justify-center p-1 text-xs text-white bg-gray-700'
              >
                <ImFilesEmpty />
                <span>copy</span>
              </button>
            </div>
          )}
        </div>

        {/* content  */}
        <textarea
          value={content}
          name='content'
          className='flex-1 w-full p-2 font-mono text-lg tracking-wide rounded outline-none resize-none focus:ring-1'
          placeholder='## Markdown'
          onChange={handleChange}
        ></textarea>

        {/* Tags input */}
        <div>
          <label className='text-gray-500' htmlFor='tags'>
            Tags
          </label>
          <input
            value={tags}
            name='tags'
            id='tags'
            className='w-full p-2 rounded outline-none focus:ring-1 '
            placeholder='tag1, tag2, tag3'
            type='text'
            onChange={handleChange}
          />
        </div>
        {/* meta description input */}
        <div>
          <label className='text-gray-500' htmlFor='meta'>
            Meta description {meta.length} / 150
          </label>
          <textarea
            value={meta}
            name='meta'
            id='meta'
            className='w-full p-2 rounded outline-none resize-none h-28 focus:ring-1'
            placeholder='Meta description'
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      {/* Right Side */}
      <div className='relative w-1/4 px-2 '>
        <h1 className='mb-2 text-xl font-semibold text-gray-700'>Thumbnail</h1>
        {/* Image Input */}
        <div>
          <input
            name='thumbnail'
            id='thumbnail'
            type='file'
            onChange={handleChange}
            hidden
          />
          <label className='cursor-pointer' htmlFor='thumbnail'>
            {selectedThumbnailURL ? (
              <img
                src={selectedThumbnailURL}
                className='rounded shadow-sm aspect-video'
                alt='selected thumbnail'
              />
            ) : (
              <div className='flex flex-col items-center justify-center text-gray-500 border border-gray-500 border-dashed aspect-video'>
                <span>Select thumbnail</span>
                <span className='text-xs'>Recommended size</span>
                <span className='text-xs'>1280 * 720</span>
              </div>
            )}
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

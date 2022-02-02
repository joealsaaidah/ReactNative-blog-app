import React from "react";
import Markdown from "markdown-to-jsx";

const DeviceView = ({ onClose, visible, thumbnail, title, content }) => {
  if (!visible) return null;

  const deviceViewClosingHandler = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id='container'
      onClick={deviceViewClosingHandler}
      className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm'
    >
      <div className='overflow-auto bg-white rounded w-device-width h-device-height'>
        <img src={thumbnail} className='aspect-video' alt='post-thumbnail' />
        <div className='px-2'>
          <h1 className='py-2 text-xl font-semibold text-gray-700'>{title}</h1>
          <div className='prose-sm prose'>
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceView;

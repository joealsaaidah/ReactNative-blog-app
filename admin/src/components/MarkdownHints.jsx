import React, { useEffect, useRef } from "react";

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

const MarkdownHints = () => {
  const container = useRef();
  useEffect(() => {
    container.current?.classList.remove("-translate-y-5", "opacity-0");
    container.current?.classList.add("translate-y-0", "opacity-1");
  }, []);
  return (
    <div
      ref={container}
      className='px-2 py-4 text-sm transition -translate-y-5 bg-white rounded opacity-0'
    >
      <h1 className='font-semibold text-center'>General markdown rules</h1>
      <ul className='space-y-2'>
        {mdRules.map(({ title, rule }) => (
          <li key={title}>
            <p className='font-semibold text-gray-500'>{title}</p>
            <p className='pl-2 font-mono font-semibold text-gray-700'>{rule}</p>
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
  );
};

export default MarkdownHints;

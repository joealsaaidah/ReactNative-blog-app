import React from "react";

const SearchBar = () => {
  return (
    <form>
      <input
        type='text'
        className='w-56 p-1 border border-gray-500 rounded outline-none focus:ring-1 ring-blue-500'
        placeholder='Search ...'
      />
    </form>
  );
};

export default SearchBar;

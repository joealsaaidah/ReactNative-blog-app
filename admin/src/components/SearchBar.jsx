import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSearch } from "../context/SearchProvider";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchHandler, resetSearch, searchResult } = useSearch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    searchHandler(query);
  };

  const searchResetHandler = (e) => {
    resetSearch();
    setQuery("");
  };

  const keyDownHandler = (e) => {
    if (e.key === "Escape") {
      resetSearch();
      setQuery("");
    }
  };

  return (
    <form className='relative' onSubmit={submitHandler}>
      <input
        type='text'
        className='w-56 p-1 border border-gray-500 rounded outline-none focus:ring-1 ring-blue-500'
        placeholder='Search ...'
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onKeyDown={keyDownHandler}
      />
      {searchResult.length ? (
        <button
          onClick={searchResetHandler}
          className='absolute text-gray-700 -translate-y-1/2 top-1/2 right-3'
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
};

export default SearchBar;

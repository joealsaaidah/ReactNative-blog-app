import React, { createContext, useContext, useState } from "react";
import { searchPosts } from "../api/post";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  const searchHandler = async (query) => {
    const { error, posts } = await searchPosts(query);
    if (error) return console.log(error);
    setSearchResult(posts);
    console.log("searchResult", searchResult);
  };

  const resetSearch = () => {
    setSearchResult([]);
  };

  return (
    <SearchContext.Provider
      value={{ searchResult, searchHandler, resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export const useSearch = () => useContext(SearchContext);

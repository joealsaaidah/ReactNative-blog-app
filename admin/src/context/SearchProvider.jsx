import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPosts } from "../api/post";
import { useNotification } from "./NotificationProvider";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const searchHandler = async (query) => {
    const { error, posts } = await searchPosts(query);
    if (error) return updateNotification("error", error);
    setSearchResult(posts);
    navigate("/");
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

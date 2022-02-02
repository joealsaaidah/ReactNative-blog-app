import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  CreatePost,
  UpdatePost,
  NotFound,
  Navbar,
  SearchBar,
} from "./components";

const App = () => {
  const [closedNav, setClosedNav] = useState(false);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  return (
    <div className='flex'>
      {/* nav section */}
      <div
        className={`${
          closedNav ? "w-16" : "w-56"
        } min-h-screen transition-width border border-r`}
      >
        <div className='sticky top-0'>
          <Navbar closeNav={closedNav} />
        </div>
      </div>

      {/* content section */}
      <div className='flex-1 min-h-screen bg-gray-100'>
        <div className='sticky top-0'>
          <div className='flex items-center p-2 space-x-2'>
            <button>
              {closedNav ? (
                <AiOutlineMenuUnfold size={25} onClick={toggleNav} />
              ) : (
                <AiOutlineMenuFold size={25} onClick={toggleNav} />
              )}
            </button>
            <SearchBar />
          </div>
        </div>
        <div className='max-w-screen-lg mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:slug' element={<UpdatePost />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

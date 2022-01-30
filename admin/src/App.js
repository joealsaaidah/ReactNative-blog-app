import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Routes, Route, Link } from "react-router-dom";
import { Home, CreatePost, UpdatePost, NotFound, Navbar } from "./components";

const App = () => {
  const [closedNav, setClosedNav] = useState(false);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  return (
    <div className='flex'>
      {/* nav section */}
      <div
        className={`${closedNav ? "w-16" : "w-56"} h-screen transition-width `}
      >
        <Navbar closeNav={closedNav} />
      </div>
      {/* content section */}
      <div className='flex-1 min-h-screen bg-blue-100'>
        <button>
          {closedNav ? (
            <AiOutlineMenuUnfold size={25} onClick={toggleNav} />
          ) : (
            <AiOutlineMenuFold size={25} onClick={toggleNav} />
          )}
        </button>
        <div className='max-w-screen-lg mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post' element={<UpdatePost />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

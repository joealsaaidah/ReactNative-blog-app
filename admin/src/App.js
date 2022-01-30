import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

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
        } h-screen bg-red-500 transition-width `}
      ></div>
      {/* content section */}
      <div className='flex-1 min-h-screen bg-blue-100'>
        <button>
          {closedNav ? (
            <AiOutlineMenuUnfold size={25} onClick={toggleNav} />
          ) : (
            <AiOutlineMenuFold size={25} onClick={toggleNav} />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;

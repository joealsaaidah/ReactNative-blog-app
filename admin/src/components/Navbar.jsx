import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillFileAdd, AiOutlineHome } from "react-icons/ai";

const NavItem = ({ route, name, icon, closed }) => {
  const commonStyleClasses =
    "flex items-center space-x-2 w-full p-2 block text-white whitespace-nowrap";
  const activeClasses = `${commonStyleClasses} bg-blue-500 text-white`;
  const inActiveClasses = `${commonStyleClasses} text-gray-500`;

  return (
    <NavLink
      to={route}
      className={({ isActive }) => (isActive ? activeClasses : inActiveClasses)}
    >
      {icon}
      <span
        className={`${
          closed
            ? "w-0 transition-width overflow-hidden"
            : "w-full transition-width overflow-hidden"
        }`}
      >
        {name}
      </span>
    </NavLink>
  );
};

const Navbar = ({ closeNav }) => {
  return (
    <nav>
      <div className='flex items-center justify-center p-3'>
        <img className='w-20 ' src='./mimicucu.png' alt='logo' />
      </div>
      <ul>
        <li>
          <NavItem
            route='/'
            style
            name='Home'
            icon={<AiOutlineHome size={25} />}
            closed={closeNav}
          />
        </li>
        <li>
          <NavItem
            route='/create-post'
            style
            name='Create Post'
            icon={<AiFillFileAdd size={25} />}
            closed={closeNav}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

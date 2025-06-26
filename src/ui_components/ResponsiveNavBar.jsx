import React from 'react'
import { NavLink } from 'react-router-dom'

const ResponsiveNavBar = ({ isAuthenticated, username ,logout}) => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF]">
    <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">
              {isAuthenticated ? 
          <>
            <NavLink
                to={`/profile/${username}`}
                className={({ isActive }) => (isActive ? "active" : "")}>
                Hi, {username}!!
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) =>
                `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                FAQ's
            </NavLink>
            <NavLink to="/create" className={({ isActive }) =>
                  `${isActive ? "active" : ""} hover:text-[#10b981] cursor-pointer`}>
                Create Post
            </NavLink>
            <li onClick={logout} className="hover:text-[#ea4e4e] cursor-pointer">Logout</li>
          </>
        :
          <>
            <NavLink to="/faq" className={({ isActive }) =>
                `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                FAQ's
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) =>
                  `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                Register
            </NavLink>

            <NavLink to="/login" className={({ isActive }) =>
                  `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                Login
            </NavLink>

          </>
        }
    </ul>
  </nav>
  )
}

export default ResponsiveNavBar
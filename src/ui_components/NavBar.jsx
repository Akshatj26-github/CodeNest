import { Switch } from "@/components/ui/switch";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ darkMode, handleDarkMode, isAuthenticated, username, setUsername, setIsAuthenticated }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
    setUsername(null);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <>
      <nav className="max-container px-10 py-6 flex justify-between items-center gap-6 sticky top-0 z-7 bg-white dark:bg-[#141624] shadow-md">
        {/* App Name */}
        <Link to="/" className="text-[#1a1a1a] text-3xl font-bold dark:text-white">
          CodeNest
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="px-3 py-1 rounded-md border dark:bg-[#1a1a1a]
             dark:text-white text-black"
          />
          <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-white">Search</button>
        </form>

        {/* Navigation Items */}
        <ul className="flex items-center text-lg justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-white font-medium">
          {isAuthenticated ? (
            <>
              <NavLink to={`/profile/${username}`} className={({ isActive }) => (isActive ? "active" : "")}>
                Hi, {username}
              </NavLink>
              <NavLink to="/faq" className={({ isActive }) => `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                FAQ's
              </NavLink>
              <NavLink to="/create" className={({ isActive }) => `${isActive ? "active" : ""} hover:text-[#10b981] cursor-pointer`}>
                Create Post
              </NavLink>
              <li onClick={logout} className="hover:text-[#ea4e4e] cursor-pointer">Logout</li>
            </>
          ) : (
            <>
              <NavLink to="/faq" className={({ isActive }) => `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                FAQ's
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                Register
              </NavLink>
              <NavLink to="/login" className={({ isActive }) => `${isActive ? "active" : ""} hover:text-[#5659e5] cursor-pointer`}>
                Login
              </NavLink>
            </>
          )}
        </ul>

        {/* Theme + Mobiel icon */}
        <div className="flex items-center gap-4">
          <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
          <HiOutlineMenuAlt3
            className="text-3xl cursor-pointer hidden max-md:block dark:text-white"
            onClick={() => setShowNavBar(curr => !curr)}
          />
        </div>
      </nav>

      {/* Mobile Nav */}
      {showNavBar && (
        <ResponsiveNavBar
          isAuthenticated={isAuthenticated}
          username={username}
          logout={logout}
        />
      )}
    </>
  );
};

export default NavBar;

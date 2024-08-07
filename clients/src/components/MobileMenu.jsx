import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/features/auth/auth";
import { Dashboard } from "@mui/icons-material";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isAuth = useSelector(getAuth);
  const isAdmin = isAuth?.data?.user?.role === "admin";

  const handleShowMenu = () => {
    setShowMenu((show) => !show);
  };

  return (
    <div className="block lg:hidden">
      <button
        className="text-lg text-light-2 hover:text-light-1 transition-all duration-200 z-50"
        onClick={handleShowMenu}
      >
        <span>menu</span>
        <span>
          {showMenu ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </span>
      </button>
      {showMenu && (
        <div className="absolute z-30  top-20 left-0 h-screen w-full bg-light-3 lg:hidden">
          <ul className="space-y-4 mt-8 px-6 ">
            <li className="text-white text-lg">
              <Link
                to={"/movie"}
                className="text-light-2 space-x-2 hover:text-light-1  transition-all duration-200"
              >
                <MovieIcon />
                <span className="font-semibold">Movie</span>
              </Link>
            </li>
            <li className="text-white  text-lg">
              <Link
                to={"/series"}
                className="text-light-2 space-x-2 hover:text-light-1  transition-all duration-200"
              >
                <LiveTvIcon />
                <span className="font-semibold">Series</span>
              </Link>
            </li>
            <li className="text-white text-lg">
              <Link
                to={"/movie"}
                className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
              >
                <AutoAwesomeMosaicIcon />
                <span className="font-semibold">Categories</span>
              </Link>
            </li>
            <li className="text-white text-lg">
              <Link
                to={isAuth ? "/favorites" : "/login"}
                className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
              >
                <SubscriptionsIcon />
                <span className="font-semibold">My List</span>
              </Link>
            </li>
            <li className="text-white text-lg">
              <Link
                to={"/search"}
                className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
              >
                <SearchIcon />
                <span className="font-semibold">Search</span>
              </Link>
            </li>
            {isAdmin && isAuth && (
              <li className="text-white text-lg">
                <Link
                  to={"/dashboard"}
                  className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
                >
                  <Dashboard />
                  <span className="font-semibold">Dashboard</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

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
import MobileSearchBar from "./MobileSearchBar";
import MobileMenuCategory from "./MobileMenuCategory";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isAuth = useSelector(getAuth);
  const isAdmin = isAuth?.data?.user?.role === "admin";

  const handleShowMenu = () => {
    setShowMenu((show) => !show);
  };

  const handleShowSearch = () => {
    setShowSearch((show) => !show);
  };

  const [showGenres, setShowGenres] = useState(false);

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
                to={"/movies"}
                className="text-light-2 space-x-2 hover:text-light-1  transition-all duration-200"
              >
                <MovieIcon />
                <span className="font-semibold">Movies</span>
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
              <button
                onClick={() => setShowGenres((show) => !show)}
                className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
              >
                <AutoAwesomeMosaicIcon />
                <span className="font-semibold">Genres</span>
              </button>

              {showGenres && <MobileMenuCategory />}
            </li>
            <li className="text-white text-lg">
              <Link
                to={isAuth ? "/list" : "/login"}
                className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
              >
                <SubscriptionsIcon />
                <span className="font-semibold">My List</span>
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
            <li className="text-white text-lg">
              <button
                type="button"
                onClick={handleShowSearch}
                className="text-light-2 space-x-2 hover:text-light-1 transition-all duration-200"
              >
                <SearchIcon />
                <span className="font-semibold">Search</span>
              </button>
            </li>
          </ul>
          <div className="mt-4 px-6">{showSearch && <MobileSearchBar />}</div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { categories } from "../constants/NavLinks";
import { Link } from "react-router-dom";

const MenuCategory = () => {
  const [showMenu, setShowMenu] = useState(false);

  //   const handleMenu = () => {
  //     setShowMenu((show) => !show);
  //   };

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  return (
    <li
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="nav-link font-semibold">
        <span>Genres</span>
        <span>
          {showMenu ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </span>
      </button>
      {showMenu && (
        <ul className="absolute  grid grid-cols-3 gap-x-6 gap-y-2 w-[400px] bg-light-3 py-4 px-6">
          {categories.map((link) => {
            return (
              <li key={link.key}>
                <Link to={link.href} className="nav-link font-medium">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default MenuCategory;

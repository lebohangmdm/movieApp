import { useState } from "react";
import { categories } from "../constants/NavLinks";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const MenuCategory = () => {
  const [showMenu, setShowMenu] = useState(false);

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
      <button className="nav-link font-semibold flex items-end ">
        <span>Genres</span>
        <span>
          {showMenu ? (
            <ChevronDownIcon className="h-6 w-6" />
          ) : (
            <ChevronUpIcon className="h-6 w-6" />
          )}
        </span>
      </button>
      {showMenu && (
        <ul className="z-30 absolute  grid grid-cols-3 gap-x-6 gap-y-2 w-[400px] bg-[#2c2e4c] py-4 px-6">
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

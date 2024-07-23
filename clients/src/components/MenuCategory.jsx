import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useFetchAllContents } from "../services/hooks/contentHooks";
import ErrorMessage from "./ErrorMessage";

const MenuCategory = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const { contents, error } = useFetchAllContents({
    sort: "createdAt",
  });

  const genres = [
    ...new Set(
      contents?.map((content) => [...content.genres]).flatMap((arr) => arr)
    ),
  ].sort((a, b) => a.localeCompare(b));

  if (error) return <ErrorMessage error={error?.data?.message} />;

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
        <ul className="z-30 absolute  grid grid-cols-4 gap-x-6 gap-y-2 w-[450px] bg-[#2c2e4c] py-4 px-6">
          {genres.map((genre) => {
            return (
              <li key={genre}>
                <Link to={`/genres/${genre}`} className="sub-link font-medium">
                  {genre}
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

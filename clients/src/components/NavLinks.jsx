import { Link } from "react-router-dom";
import { Nav_Links } from "../constants/NavLinks";
import MenuCategory from "./MenuCategory";

const NavLinks = () => {
  const auth = true;

  return (
    <ul className="hidden  lg:flex items-center md:gap-8 lg:gap-12 ">
      <>
        {Nav_Links.map((link) => {
          return (
            <Link key={link.key} to={link.href} className="nav-link">
              {link.label}
            </Link>
          );
        })}
        <MenuCategory />
        {auth && (
          <Link to={"favorite"} className="nav-link">
            My list
          </Link>
        )}
      </>
    </ul>
  );
};

export default NavLinks;

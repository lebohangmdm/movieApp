import { Link } from "react-router-dom";
import { Nav_Links } from "../constants/NavLinks";
import MenuCategory from "./MenuCategory";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/features/auth/auth";

const NavLinks = () => {
  const isAuth = useSelector(getAuth);
  const isAdmin = isAuth?.data?.user?.role === "admin";

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
        {isAuth && (
          <Link to={"favorite"} className="nav-link">
            My list
          </Link>
        )}
        {isAuth && isAdmin && <Link to={"/dashboard"}>Dashboard</Link>}
      </>
    </ul>
  );
};

export default NavLinks;

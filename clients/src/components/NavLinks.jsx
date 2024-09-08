import { Link } from "react-router-dom";
import { Nav_Links } from "../constants/NavLinks";
import MenuCategory from "./MenuCategory";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/features/auth/auth";

const NavLinks = () => {
  const isAuth = useSelector(getAuth);
  const isAdmin = isAuth?.data?.user?.role === "admin";
  const auth = isAuth && isAdmin;

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
          <Link to={isAuth ? "/list" : "/login"} className="nav-link">
            My list
          </Link>
        )}
        {auth && (
          <Link to={"/dashboard"} className="nav-link">
            dashboard
          </Link>
        )}
      </>
    </ul>
  );
};

export default NavLinks;

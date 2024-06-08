import { AccountMenu, MobileMenu, NavLinks, SearchBar } from "../components";

const Header = () => {
  return (
    <header className="relative py-5 border border-red-500 ">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <nav className="flex justify-between items-center">
          <MobileMenu />
          <p className="text-2xl text-light-1 z-30">Logo</p>
          <NavLinks />
          <div className="flex items-center">
            <SearchBar />
            <AccountMenu />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

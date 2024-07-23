import { MobileMenu, NavLinks, SearchBar, AccountMenu } from "../components";

const Header = () => {
  return (
    <header className="relative py-4 bg-[#111]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <nav className="flex justify-between items-center">
          <MobileMenu />
          <p className="text-2xl text-light-1 hover:text-purple-2 z-30">Logo</p>
          <NavLinks />
          <div className="flex items-center gap-4">
            <SearchBar />
            <AccountMenu />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

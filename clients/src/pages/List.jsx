import { Link, Outlet } from "react-router-dom";

const List = () => {
  return (
    <section className="max-w-7xl mx-auto  py-12 px-4 md:px-8 lg:px-12 text-white">
      <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-brownish-1 font-semibold mb-4 md:mb-8">
        <Link to={"/list/my-list"}>My List</Link> /{" "}
        <Link to={"/list/favourites"}>favourites</Link>
      </h3>
      <Outlet />
    </section>
  );
};

export default List;

import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-black h-height-dvh">
      <div className="max-w-7xl  mx-auto py-8 px-4 md:px-8 lg:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 lg:mb-8">
          Dashboard
        </h1>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-2/5 lg:w-1/4">
            <ul className="text-white space-y-2 md:space-y-4">
              <li>
                <Link to={"/dashboard"} className="">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/contents"}>Content List</Link>
              </li>
              <li>
                <Link to={"/dashboard/create-content"}>Create Content</Link>
              </li>
              <li>
                <Link to={"/dashboard/update-content"}>update Content</Link>
              </li>
              <li>
                <Link to={"/dashboard/users"}>Users</Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

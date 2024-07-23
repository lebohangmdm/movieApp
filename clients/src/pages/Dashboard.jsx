import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLogout } from "../services/hooks/usersHooks";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { List, UploadFile } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";

const Dashboard = () => {
  const { handleLogout, errorLogout } = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await handleLogout();
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (errorLogout) {
      return toast.error(errorLogout?.data?.message);
    } else {
      toast.dismiss();
    }
    return () => {
      toast.dismiss();
    };
  }, [errorLogout]);

  return (
    <section className="bg-black">
      <div className="max-w-7xl  mx-auto py-8 px-4 md:px-8 lg:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 lg:mb-8">
          Dashboard
        </h1>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-[35%] lg:w-1/4">
            <ul className="text-white space-y-2 md:space-y-4">
              <li>
                <Link to={"/dashboard"} className="">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/contents"}>
                  <span>
                    <List className="w-6 h-6 text-white" />{" "}
                  </span>{" "}
                  Content List
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/create-content"}>
                  <span>
                    <UploadFile className="w-6 h-6 text-white" />{" "}
                  </span>{" "}
                  Create Content
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/users"}
                  className="flex items-center gap-2"
                >
                  <span>
                    <UserGroupIcon className="w-6 h-6 text-white" />{" "}
                  </span>{" "}
                  Users
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center gap-2"
                  onClick={logoutHandler}
                >
                  <span>
                    <Logout className="w-6 h-6 text-white" />{" "}
                  </span>{" "}
                  Logout
                </button>
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

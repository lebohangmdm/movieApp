import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="bg-banner">
      <div className="w-full md:w-1/2 px-4 py-6 md:p-0 md:py-0 ">
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-md  w-full px-4 py-6  border-white border rounded-md shadow-md">
            <h1 className="text-2xl text-white font-semibold text-center mb-4">
              Login
            </h1>
            <form action="" className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="text-white md:text-lg">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="py-2 px-4 bg-transparent  text-white border border-light-1 md:text-lg rounded md:rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="text-white md:text-lg">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="py-2 px-4 bg-transparent  text-white border border-light-1 md:text-lg rounded md:rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-light-3 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:bg-black"
              >
                Login
              </button>
              <p className="text-sm text-white text-center">
                Already have an account?{" "}
                <Link to={"/register"} className="underline underline-offset-2">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

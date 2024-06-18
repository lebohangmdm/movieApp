import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="bg-banner">
      <div className="w-full md:w-1/2 px-4 py-6 md:p-0 md:py-0 ">
        <div className="flex justify-center items-center min-h-screen ">
          <div className="max-w-md  w-full py-4 px-6 md:py-8 border-white border rounded-md shadow-md">
            <h1 className="text-2xl text-white text-center font-semibold mb-4">
              Register
            </h1>
            <form action="" className="space-y-5">
              <div className="flex flex-col space-y-1">
                <label htmlFor="fullName" className="text-white md:text-lg">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="py-2 px-4 bg-transparent  text-white border border-light-1 md:text-lg rounded md:rounded-md"
                />
              </div>
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
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="text-white md:text-lg">
                  Password Confirm:
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  className="py-2 px-4 bg-transparent  text-white border border-light-1 md:text-lg rounded md:rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-light-3 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:bg-black"
              >
                Register
              </button>
              <p className="text-sm text-white text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-2">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

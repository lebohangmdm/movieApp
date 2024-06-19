import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../components";
import { useLoginMutation } from "../services/authService";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { handleFirstWord } from "../utils/helpers";

const Login = () => {
  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const onSubmit = async (data) => {
    const { data: dataInfo } = await loginUser(data);
    if (dataInfo?.success) {
      const firstName = handleFirstWord(dataInfo?.data.user.fullName);
      toast.success(`Welcome back, ${firstName}`);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  return (
    <section className="bg-banner">
      <div className="w-full md:w-1/2 px-4 py-6 md:px-6 ">
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-md w-full px-4 py-6 lg:py-8 lg:px-8 border-white border rounded-md shadow-md">
            <h1 className="text-2xl text-white font-semibold text-center mb-4">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="text-white ">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="py-2 px-4 bg-transparent  text-white border border-light-1  rounded md:rounded-md"
                />
                {errors.email && <InputError error={errors.email.message} />}
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="text-white ">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password")}
                  className="py-2 px-4 bg-transparent  text-white border border-light-1  rounded md:rounded-md"
                />
                {errors.password && (
                  <InputError error={errors.password.message} />
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-light-3 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none hover:border hover:border-white focus:ring ring-white"
              >
                {isLoading ? "Loading" : "Login"}
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

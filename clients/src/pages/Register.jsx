import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterValidation } from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../components";
import { useRegisterMutation } from "../services/authService";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { handleFirstWord } from "../utils/helpers";

const Register = () => {
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterValidation) });

  const onSubmit = async (data) => {
    const { data: dataInfo } = await registerUser(data);
    if (dataInfo?.success) {
      const firstName = handleFirstWord(dataInfo?.data.user.fullName);
      toast.success(`Welcome, ${firstName}! Glad to have you join us! 🎉 `);
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
        <div className="flex justify-center items-center min-h-screen ">
          <div className="max-w-md  w-full py-4 px-6 lg:py-8 lg:px-8 border-white border rounded-md shadow-md">
            <h1 className="text-2xl text-white text-center font-semibold mb-4">
              Register
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-1">
                <label htmlFor="fullName" className="text-white ">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullName"
                  {...register("fullName")}
                  placeholder="John Doe"
                  className="py-2 px-4 bg-transparent  text-white border border-light-1  rounded md:rounded-md"
                />
                {errors.fullName && (
                  <InputError error={errors.fullName.message} />
                )}
              </div>
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
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="text-white ">
                  Password Confirm:
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  {...register("passwordConfirm")}
                  className="py-2 px-4 bg-transparent  text-white border border-light-1  rounded md:rounded-md"
                />
                {errors.passwordConfirm && (
                  <InputError error={errors.passwordConfirm.message} />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-light-3 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none hover:border hover:border-white focus:ring ring-white"
              >
                {isLoading ? "Loading..." : "Register"}
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

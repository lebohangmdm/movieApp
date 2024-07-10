import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputError } from "../components";
import { useUpdatePasswordMutation } from "../services/authService";
import toast from "react-hot-toast";
import { updatePasswordValidation } from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const Settings = () => {
  const [updatePassword, { isLoading: isUpdating, error, isSuccess, isError }] =
    useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(updatePasswordValidation) });

  const onSubmit = (data) => {
    updatePassword(data);
    reset();
  };

  useEffect(() => {
    let toastId; // Initialize a variable to store toast ID if needed

    if (isError) {
      const errorMessage = error?.data?.message || "An error occurred";
      toastId = toast.error(errorMessage); // Store the toast ID
    } else if (isSuccess) {
      toastId = toast.success("Password updated successfully"); // Store the toast ID
    }

    // Cleanup function to be called on component unmount or before running the effect again
    return () => {
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast if it's still visible
      }
    };
  }, [isError, isSuccess, error]);

  return (
    <section className="bg-black h-height-dvh">
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-8 lg:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 lg:mb-8">
          Update Password
        </h1>

        <div className="flex flex-col gap-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5 md:mb-6">
              <label className="text-sm text-white mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="py-1 px-4 bg-[#444] text-white focus:outline-none"
                {...register("currentPassword", {
                  required: "Current Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have 6 or more characters",
                  },
                })}
              />
              {errors.currentPassword && (
                <InputError error={errors.currentPassword.message} />
              )}
            </div>
            <div className="flex flex-col mb-5 md:mb-6">
              <label className="text-sm text-white mb-2">New Password</label>
              <input
                type="password"
                className="py-1 px-4 bg-[#444] text-white focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have 6 or more characters",
                  },
                })}
              />
              {errors.password && (
                <InputError error={errors.password.message} />
              )}
            </div>
            <div className="flex flex-col mb-5 md:mb-6">
              <label className="text-sm text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="py-1 px-4 bg-[#444] text-white focus:outline-none"
                {...register("passwordConfirm", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have 6 or more characters",
                  },
                })}
              />
              {errors.passwordConfirm && (
                <InputError error={errors.passwordConfirm.message} />
              )}
            </div>
            <div className="mt-8 flex justify-between ">
              <Button
                variant="contained"
                size="small"
                color="success"
                type="submit"
                sx={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                {isUpdating ? "Updating..." : "Update Password"}
              </Button>
              {/* <Button
                  variant="contained"
                  size="small"
                  color="error"
                  type="button"
              
                  sx={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                >
                  {isDeleting ? "Deleting..." : "Delete Profile"}
                </Button> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Settings;

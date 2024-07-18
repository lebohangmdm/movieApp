import { useForm } from "react-hook-form";
import { ErrorMessage, InputError, Loader, UploadImage } from "../components";
import { Button } from "@mui/material";

import {
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} from "../services/usersService";
import { useNavigate } from "react-router-dom";
import { useFetchGetUser, useLogout } from "../services/hooks/usersHooks";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "../redux/features/auth/auth";

const Profile = () => {
  const {
    userData,
    isLoading: loadingUserData,
    error: errorUserData,
  } = useFetchGetUser();
  console.log(errorUserData);

  const dispatch = useDispatch();

  const fullName = userData?.doc?.fullName;
  const email = userData?.doc?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("fullName", fullName);
    setValue("email", email);
  }, [setValue, fullName, email]);

  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();
  const [deleteProfile, { isLoading: isDeleting, error: errorDelete }] =
    useDeleteProfileMutation();

  const { handleLogout, errorLogout } = useLogout();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteProfile();
    if (errorDelete) return toast.error(errorDelete?.data?.message);
    handleLogout();
    if (errorLogout) return toast.error(errorLogout?.data?.message);
    toast.success("Your account has been deactivated");
    dispatch(logout());
    navigate("/");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const onSubmit = (data) => {
    updateProfile(data);
    const fullName = (userInfo.data.user.fullName = data.fullName);
    const email = (userInfo.data.user.fullName = data.email);
    dispatch(
      setCredentials({
        ...userInfo,
        data: {
          ...userInfo.data,
          user: {
            ...userInfo.data.user,
            fullName: fullName,
            email: email,
          },
        },
      })
    );
    if (updateError) return toast.error(updateError.message);
    navigate(window.location.pathname, { replace: true });
  };

  if (errorUserData)
    return <ErrorMessage error={errorUserData?.data?.message} />;

  return (
    <section className="bg-black h-height-dvh">
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-8 lg:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 lg:mb-8">
          Edit Profile
        </h1>
        {loadingUserData ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-2/5 lg:w-1/4">
              <UploadImage />
            </div>
            <div className="flex-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-5 md:mb-6">
                  <label className="text-sm text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    className="py-1 px-4 bg-[#444] text-white focus:outline-none"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                  />
                  {errors.fullName && (
                    <InputError error={errors.fullName.message} />
                  )}
                </div>
                <div className="flex flex-col mb-5 md:mb-6">
                  <label className="text-sm text-white mb-2">Email</label>
                  <input
                    type="email"
                    className="py-1 px-4 bg-[#444] text-white focus:outline-none"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <InputError error={errors.email.message} />}
                </div>
                <div className="mt-8 flex justify-between ">
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    type="submit"
                    sx={{ fontSize: "14px", textTransform: "capitalize" }}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    type="button"
                    onClick={handleDelete}
                    sx={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                  >
                    {isDeleting ? "Deleting..." : "Delete Profile"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;

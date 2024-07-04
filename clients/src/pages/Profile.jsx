import { useForm } from "react-hook-form";
import { InputError, UploadImage } from "../components";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <section className="bg-black h-height-dvh">
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-8 lg:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 lg:mb-8">
          Edit Profile
        </h1>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-2/5 lg:w-1/4">
            <UploadImage />
          </div>
          <div className="flex-1">
            <form
              className="space-y-4 md:space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <label className="text-sm text-white mb-2">Full Name</label>
                <input
                  type="text"
                  className="py-1 px-4 bg-[#444] text-white focus:outline-none"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  value={fullName}
                />
                {errors.fullName && (
                  <InputError error={errors.fullName.message} />
                )}
              </div>
              <div className="flex flex-col">
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
                  value={email}
                />
                {errors.email && <InputError error={errors.email.message} />}
              </div>
            </form>
            <div className="mt-8 flex justify-between md:mt-10 lg:mt-12">
              <Button variant="contained" size="small" color="success">
                Update Profile
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<Delete />}
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

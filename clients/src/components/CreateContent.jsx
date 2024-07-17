import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import InputError from "./InputError";
import { Button } from "@mui/material";
import { useCreateContentMutation } from "../services/contentsService";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "./Loader";

const CreateContent = () => {
  const [createContent, { isLoading, error, isSuccess, isError, data }] =
    useCreateContentMutation();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "movie",
      totalSeasons: "",
    },
  });

  const selectedType = watch("type");

  console.log(data);
  const onSubmit = (data) => {
    const formData = new FormData();

    const genres = data.genres.toLowerCase().split(",");
    console.log(genres);

    formData.append("title", data.title);
    formData.append("duration", data.duration);
    formData.append("releaseYear", data.releaseYear);
    formData.append("releaseDate", data.releaseDate);
    formData.append("cast", data.cast);
    formData.append("directors", data.directors);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("totalSeasons", data.totalSeasons);
    genres.forEach((genre) => {
      formData.append("genres[]", genre); // Using 'genres[]' to indicate an array
    });

    // console.log(data);
    if (data.coverImage && data.coverImage[0]) {
      formData.append("coverImage", data.coverImage[0]);
    }

    createContent(formData);
    reset();
  };

  useEffect(() => {
    let toastId; // Initialize a variable to store toast ID if needed

    // error for contents

    if (isError) {
      const errorMessage = error?.data?.message || "An error occurred";
      toastId = toast.error(errorMessage); // Store the toast ID]\
    } else if (isSuccess) {
      toastId = toast.success("Content created successfully"); // Store the toast ID
    }

    // Cleanup function to be called on component unmount or before running the effect again
    return () => {
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast if it's still visible
      }
    };
  }, [isError, isSuccess, error]);

  return (
    <div>
      <h1>Create Content</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 md:gap-y-7"
          >
            <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label className="text-sm">Title</label>
                <input
                  type="text"
                  className="text-sm  py-2 px-4 bg-transparent md:text-base"
                  {...register("title", {
                    required: "Please provide the title",
                  })}
                />
                {errors.title && <InputError error={errors.title.message} />}
              </div>
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Duration
                </label>
                <input
                  type="text"
                  className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
                  placeholder="126 min"
                  {...register("duration", {
                    required: "Please provide the duration",
                  })}
                />
                {errors.duration && (
                  <InputError error={errors.duration.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Release Year
                </label>
                <input
                  type="text"
                  className="text-sm  py-2 px-4 bg-transparent md:text-base "
                  placeholder="2024"
                  {...register("releaseYear", {
                    required: "Please provide the release year",
                  })}
                />
                {errors.releaseYear && (
                  <InputError error={errors.releaseYear.message} />
                )}
              </div>
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Release Date
                </label>
                <input
                  type="text"
                  className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
                  placeholder="26 May 2024"
                  {...register("releaseDate", {
                    required: "Please provide the release date",
                  })}
                />
                {errors.releaseDate && (
                  <InputError error={errors.releaseDate.message} />
                )}
              </div>
            </div>
            <div className="text-white flex flex-col gap-y-2 w-full  ">
              <label htmlFor="" className="text-sm">
                Description
              </label>
              <textarea
                name="description"
                cols="30"
                rows="3"
                className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
                {...register("description", {
                  required: "Please provide the description",
                })}
              ></textarea>
              {errors.description && (
                <InputError error={errors.description.message} />
              )}
            </div>
            <div className="flex items-center justify-between lg:gap-16">
              <div className="text-white flex flex-col gap-y-2">
                <label htmlFor="media-select" className="text-white text-sm">
                  Select Content Type:
                </label>
                <select
                  id="type"
                  className="text-sm py-2 px-4 bg-black md:text-base"
                  {...register("type", {
                    required: "Please provide the type",
                  })}
                >
                  <option
                    value="movie"
                    className="bg-black text-white text-sm md:text-base py-2 px-4"
                  >
                    Movie
                  </option>
                  <option
                    value="series"
                    className="bg-black text-white text-sm md:text-base py-2 px-4"
                  >
                    Series
                  </option>
                </select>
                {errors.type && <InputError error={errors.type.message} />}
              </div>
              {selectedType === "series" && (
                <div className="text-white flex flex-col gap-y-2 w-52 lg:flex-1">
                  <label htmlFor="" className="text-sm">
                    Total Seasons
                  </label>
                  <input
                    type="text"
                    className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
                    {...register("totalSeasons", {
                      required:
                        selectedType === "series"
                          ? "Please provide the total season"
                          : false,
                    })}
                  />
                  {errors.totalSeasons && (
                    <InputError error={errors.totalSeasons.message} />
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Directors
                </label>
                <input
                  type="text"
                  className="text-sm  py-2 px-4 bg-transparent md:text-base "
                  placeholder="2024"
                  {...register("directors", {
                    required: "Please provide the directors",
                  })}
                />
                {errors.directors && (
                  <InputError error={errors.directors.message} />
                )}
              </div>
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Cast
                </label>
                <input
                  type="text"
                  className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
                  placeholder="Pedro Pascal, Denzel Washington"
                  {...register("cast", {
                    required: "Please provide the cast",
                  })}
                />
                {errors.cast && <InputError error={errors.cast.message} />}
              </div>
            </div>
            <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Genres
                </label>
                <input
                  type="text"
                  className="text-sm  py-2 px-4 bg-transparent md:text-base "
                  placeholder="Action, Thriller, Comedy"
                  {...register("genres", {
                    required: "Please provide the genres",
                  })}
                />
                {errors.genres && <InputError error={errors.genres.message} />}
              </div>
              <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
                <label htmlFor="" className="text-sm">
                  Trailer
                </label>
                <input
                  type="text"
                  className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
                  placeholder="https:youtube/ytkwnjse"
                  {...register("video", {
                    required: "Please provide the trailer url",
                  })}
                />
                {errors.video && <InputError error={errors.video.message} />}
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              <label className="w-full flex flex-col items-center lg:flex-row lg:gap-x-8 px-4 py-6 md:py-8 md:px-16 bg-black text-white rounded-lg shadow-lg  capitalize cursor-pointer hover:border hover:border-white hover:text-white">
                <CloudArrowUpIcon className="w-8 h-8 md:w-10 md:h-10" />
                <span className="mt-2 md:mt-4 text-base leading-normal">
                  Drag Your Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  id="coverImage"
                  {...register("coverImage", {
                    required: "Please provide the cover image",
                  })}
                />
                {errors.coverImage && (
                  <InputError error={errors.coverImage.message} />
                )}
              </label>
            </div>
            <div className="mt-8 flex justify-between ">
              <Button
                variant="contained"
                size="small"
                color="success"
                type="submit"
                sx={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                {isLoading ? "submitting" : "Create Content"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateContent;

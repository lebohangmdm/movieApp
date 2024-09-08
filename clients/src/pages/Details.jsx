import ReactPlayer from "react-player/youtube";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchGetById } from "../services/hooks/contentHooks";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  ErrorMessage,
  InputError,
  MainLoader,
  StarRating,
} from "../components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewQuery,
  useUpdateReviewMutation,
} from "../services/reviewsService";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/features/auth/auth";
import { toast } from "react-hot-toast";
import { Delete, Edit } from "@mui/icons-material";

const Details = () => {
  const auth = useSelector(getAuth);
  const userId = auth.data.user.id;
  const { id: contentId } = useParams();
  const { content, isLoading, error } = useFetchGetById(contentId);
  const [selectUpdate, setSelectUpdate] = useState(false);
  const [updateReviewId, setUpdateReviewId] = useState("");
  const navigate = useNavigate(0);

  const [userRating, setUserRating] = useState(0);
  const [createReview, { isLoading: isCreating, error: errorCreate }] =
    useCreateReviewMutation();

  const {
    data: reviewInfo,
    isLoading: reviewing,
    error: reviewError,
  } = useGetReviewQuery(updateReviewId);

  const comment = reviewInfo?.data?.doc?.comment;
  console.log(comment);

  const [updateReview, { isLoading: isUpdating, error: updateError }] =
    useUpdateReviewMutation();

  const [deleteReview, { isLoading: isDeleting, error: deleteError }] =
    useDeleteReviewMutation();

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetAllReviewsQuery({ content: contentId, sort: "-createdAt" });

  const alreadyReviewed = reviews?.data?.docs
    ?.map((data) => data.user.id)
    .includes(userId);
  const reviewData = reviews?.data?.docs?.find(
    (data) => data._id === updateReviewId
  );
  console.log(reviewData);
  console.log(updateReviewId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    formState: { errors: updateErrors },
    reset: updateReset,
  } = useForm();

  const onSubmit = async (data) => {
    const newData = {
      rating: userRating,
      comment: data?.comment,
      content: contentId,
      user: userId,
    };

    const dataInfo = await createReview(newData);
    if (dataInfo.data.status === "success") {
      toast.success("Review created successfully");
      setSelectUpdate(false);
      return;
    }
  };

  const onSubmitUpdate = async (data) => {
    const newData = {
      rating: userRating,
      comment: data.comment,
      content: contentId,
      user: userId,
    };

    console.log(userRating);
    console.log(data.comment);

    const dataInfo = await updateReview({
      id: updateReviewId,
      content: newData,
    });

    if (dataInfo.data?.status === "success") {
      toast.success("Review updated successfully");
      setSelectUpdate(false);
      setUpdateReviewId("");
      reset();
      return;
    }
  };

  const handleDelete = async (id) => {
    const reviewDelete = await deleteReview({ id });

    if (reviewDelete.data === null)
      toast.success("Review deleted successfully");
    setSelectUpdate(false);
    setUpdateReviewId("");
    updateReset();
    reset();
    return;
  };

  // Error for creating
  useEffect(() => {
    let toastId;
    if (errorCreate) {
      toastId = toast.error(errorCreate?.data?.message);
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [errorCreate]);

  // fetch a review
  useEffect(() => {
    let toastId;
    if (reviewError) {
      toastId = toast.error(reviewError?.data?.message);
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [reviewError]);

  // updating review
  useEffect(() => {
    let toastId;
    if (updateError) {
      toastId = toast.error(updateError?.data?.message);
      console.log(updateError);
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [updateError]);

  // delete a review
  useEffect(() => {
    let toastId;
    if (deleteError) {
      toastId = toast.error(deleteError?.data?.message);
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast if it's still visible
      }
    };
  }, [deleteError]);

  const handleUpdate = (id) => {
    setSelectUpdate(true);
    setUpdateReviewId(id);
  };
  console.log(content?.ratingsAverage);
  console.log(content?.totalRatings);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <section className="min-h-height-dvh">
          <div className="">
            <ReactPlayer
              url={content?.video}
              controls={true}
              width="100%"
              height="calc(100vh - 16px)"
              className=""
            />
          </div>
          <div className=" max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12 text-white ">
            <h1 className="text-white font-semibold text-2xl md:text-4xl max-w-[300px] md:max-w-2xl ">
              {content?.title}
            </h1>
            <div>
              <div className="flex items-center gap-4 md:mt-2">
                <p className="tracking-tight">{content?.duration}</p>
                <p className="tracking-tight">{content?.releaseDate}</p>
                <p className="flex sm:items-center  gap-[2px] sm:gap-1 text-sm sm:text-base capitalize tracking-tight">
                  <span>
                    <StarIcon className="text-yellow-500  w-[18px] sm:w-[20px] " />
                  </span>{" "}
                  {content?.ratingsAverage
                    ? content.ratingsAverage
                    : "Not rated yet"}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-4">
                  <p>
                    {content?.type === "series"
                      ? `${content?.releaseYear}`
                      : ""}
                  </p>
                  {content?.type === "series"
                    ? `${content?.totalSeasons} ${content?.totalSeasons > 1 ? "seasons" : "season"}`
                    : ""}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-0 lg:flex-row lg:gap-16 lg:justify-between mt-4">
                  <p className="text-sm md:max-w-xl md:text-base ">
                    {content?.description}
                  </p>
                  <div className="flex flex-col space-y-2.5 md:space-y-1 lg:space-y-0.5  ">
                    <p className="text-sm md:text-base">
                      <span className="text-light-2 ">Director </span>
                      {content?.directors}
                    </p>
                    <p className="text-sm md:text-base">
                      <span className="text-light-2 w-[200px]">Starring </span>
                      {content?.cast}
                    </p>
                  </div>
                </div>
                <div className="">
                  <ul className="flex gap-2.5  md:gap-4">
                    {content?.genres.map((genre) => {
                      return (
                        <li
                          key={genre}
                          className="capitalize underline underline-offset-4"
                        >
                          <Link
                            to={`/genres/${genre}`}
                            className="text-light-1 hover:text-white active:text-white"
                          >
                            {genre}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/* Reviews */}
            <div className="mt-16  text-white">
              <h3 className="text-white font-semibold text-xl md:text-2xl mb-8">
                Reviews ({reviews?.count})
              </h3>
              <div className="space-y-4 md:space-y-8" key={reviews?.data}>
                {reviews?.data?.docs?.map((data) => {
                  const {
                    comment,
                    rating,
                    user: { fullName, id },
                    _id,
                  } = data;

                  const permitted = id === userId;

                  return (
                    <div className=" border border-white p-4" key={_id}>
                      <div className="flex items-center gap-4 mb-0.5">
                        <p className="font-medium">{fullName}</p>
                        <div className="flex items-center gap-1 text-white">
                          <span>
                            <StarIcon className="text-yellow-500 text-[18px] w-[18px] h-[18px]" />
                          </span>{" "}
                          <p className="text-white"> {rating}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm max-w-xs md:max-w-sm">
                          {comment}
                        </p>
                        {/* if auth and permitted show btns and perform actions */}
                        {permitted && (
                          <div className="flex items-center gap-2 md:gap-4">
                            <button onClick={() => handleUpdate(_id)}>
                              <Edit sx={{ color: "green" }} />
                            </button>
                            <button onClick={() => handleDelete(_id)}>
                              <Delete sx={{ color: "red" }} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-6 mt-8">
                {/* check if reviewed false for updating reviews */}
                {alreadyReviewed && !selectUpdate ? (
                  <>
                    <p className="text-sm text-white">
                      You have already rated the Content
                    </p>
                  </>
                ) : selectUpdate ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {/* update Review form */}
                    <form onSubmit={updateHandleSubmit(onSubmitUpdate)}>
                      <textarea
                        name="comment"
                        cols="10"
                        rows="5"
                        className="bg-transparent text-white text-sm md:text-base w-full px-3 py-2  border rounded-lg focus:outline-none focus:border-purple-1 focus:ring-1 focus:ring-purple-1  h-32 transition duration-200 mt-4 "
                        {...updateRegister("comment", {
                          required: "Comment is required",
                          minLength: {
                            value: 10,
                            message:
                              "Comment must be at least 10 characters long",
                          },
                          maxLength: {
                            value: 500,
                            message: "Comment cannot exceed 500 characters",
                          },
                        })}
                        defaultValue={comment}
                        placeholder="Enter your comment here"
                      />
                      {updateErrors.comment && (
                        <InputError error={updateErrors.comment.message} />
                      )}
                      <div className="flex gap-4 mt-4">
                        <button
                          className="flex gap-4 py-3 px-6 text-sm  font-medium capitalize rounded-lg bg-purple-600  text-white hover:brightness-125 tracking-wider transition-all duration-100 cursor-pointer"
                          type="submit"
                        >
                          {isUpdating ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-white">
                      Set your rating for this Content
                    </p>
                    {userRating ? (
                      <>
                        <StarRating
                          maxRating={10}
                          size={24}
                          onSetRating={setUserRating}
                        />
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <textarea
                            name="comment"
                            cols="10"
                            rows="5"
                            className="bg-transparent text-white text-sm md:text-base w-full px-3 py-2  border rounded-lg focus:outline-none focus:border-purple-1 focus:ring-1 focus:ring-purple-1  h-32 transition duration-200 mt-4 "
                            {...register("comment", {
                              required: "Comment is required",
                              minLength: {
                                value: 10,
                                message:
                                  "Comment must be at least 10 characters long",
                              },
                              maxLength: {
                                value: 500,
                                message: "Comment cannot exceed 500 characters",
                              },
                            })}
                            placeholder="Enter your comment here"
                          />
                          {errors.comment && (
                            <InputError error={errors.comment.message} />
                          )}
                          <div className="flex gap-4 mt-4">
                            <button
                              className="flex gap-4 py-3 px-6 text-sm  font-medium capitalize rounded-lg bg-purple-600  text-white hover:brightness-125 tracking-wider transition-all duration-100 cursor-pointer"
                              type="submit"
                            >
                              {isUpdating ? "Submitting..." : "Submit"}
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={setUserRating}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;

import ReactPlayer from "react-player/youtube";
import { Link, useParams } from "react-router-dom";
import { useFetchGetById } from "../services/hooks/contentHooks";
import { StarIcon } from "@heroicons/react/20/solid";
import { ErrorMessage, Loader } from "../components";

const Details = () => {
  const { id } = useParams();
  const { content, isLoading, error } = useFetchGetById(id);

  if (error) return <ErrorMessage error={error?.data?.message} />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
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
                <p>{content?.duration}</p>
                <p>{content?.releaseDate}</p>
                <p className="flex items-center gap-1">
                  <span>
                    <StarIcon className="text-yellow-500 text-[18px] w-[18px] h-[18px]" />
                  </span>{" "}
                  {content?.rating}{" "}
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
          </div>
        </section>
      )}
    </>
  );
};

export default Details;

import ReactPlayer from "react-player/youtube";
import { Link, useParams } from "react-router-dom";
import { useFetchGetById } from "../services/hooks/contentHooks";
import { StarIcon } from "@heroicons/react/20/solid";

const Details = () => {
  const { id } = useParams();
  const { content } = useFetchGetById(id);
  const genres = content?.genres.map((genre) => console.log(genre));

  console.log(content);
  //   const {
  //     title,
  //     gneres,
  //     rating,
  //     releaseDate,
  //     releaseYear,
  //     video,
  //     cast,
  //     description,
  //     directors,
  //     duration,
  //   } = data?.doc;
  //   console.log(data);

  return (
    <section className="">
      <div className="">
        <ReactPlayer
          url={content?.video}
          controls={true}
          width="100%"
          height="calc(100vh - 16px)"
          className=""
        />
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12 text-white ">
        <h1 className="text-white font-semibold text-2xl md:text-4xl max-w-[300px] md:max-w-2xl ">
          {content?.title}
        </h1>
        <div className="flex items-center gap-4">
          <p>{content?.duration}</p>
          <p>{content?.releaseDate}</p>
          <p>
            {content?.rating}{" "}
            <span>
              <StarIcon className="text-yellow-500 text-base" />
            </span>{" "}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row  justify-between mt-4">
            <p className="text-sm md:max-w-xl md:text-base ">
              {content?.description}
            </p>
            <div className="space-y-2.5 md:space-y-1 lg:space-y-0.5">
              <p className="text-sm md:text-base">
                <span className="text-light-2 ">Director </span>
                {content?.directors}
              </p>
              <p className="text-sm md:text-base">
                <span className="text-light-2 ">Starring </span>
                {content?.cast}
              </p>
            </div>
          </div>
          <div className="flex items-center ">
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
            {/* <p className="text-light-2">
              Rating <span className="text-white">{content?.rating}</span>
            </p>
            <p className="text-light-2">{content?.releaseYear}</p>
            <p className="text-light-2">{content?.totalSeasons} seasons</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;

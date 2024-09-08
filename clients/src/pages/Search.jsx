import { Link, useParams } from "react-router-dom";
import { useFetchContentByName } from "../services/hooks/contentHooks";
import { ErrorMessage, MainLoader } from "../components";

const Search = () => {
  const { title } = useParams();
  const { contents, isLoading, error } = useFetchContentByName({ title });

  if (error) return <ErrorMessage error={error?.data?.message} />;

  if (!contents || contents.length === 0) {
    return (
      <section className="max-w-7xl h-height-dvh mx-auto py-8 px-4 md:px-8 lg:px-12 text-white">
        <div>
          <h3 className="text-2xl font-serif text-brownish-1 font-semibold md:text-3xl lg:text-4xl  text-white mb-1.5">
            No Content found
          </h3>
          <p className="text-sm md:text-base mb-2 max-w-sm sm:max-w-lg md:max-w-xl md:tracking-wide ">
            We couldn't find any movies matching your search criteria. Please
            try the following:
          </p>
          <ul className="ml-4">
            <li className="text-sm list-disc leading-6 font-medium">
              Check your spelling and try again.
            </li>
            <li className="text-sm list-disc leading-6 font-medium">
              Use different or more general keywords.
            </li>
            <li className="text-sm list-disc leading-6 font-medium">
              Explore other categories or genres.
            </li>
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12 h-height-dvh">
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="grid gap-8  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {contents?.map((content) => {
            return (
              <div
                key={content.id}
                // className="h-28  max-w-[180px] transition duration-200 ease-out md:h-32 md:max-w-[260px]"
                className="w-full sm:w-[90%] md:w-[80%] lg:[w-75%] mx-auto"
              >
                <Link key={content.id} to={`/watch/${content.id}`}>
                  <img
                    src={content.poster}
                    alt={content.title}
                    className="object-cover mx-auto "
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;

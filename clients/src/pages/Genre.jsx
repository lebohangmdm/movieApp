import { useParams } from "react-router-dom";
import { useFetchBasedOnGenreQuery } from "../services/hooks/contentHooks";
import { MainLoader, Row } from "../components";

const Genre = () => {
  const { genre } = useParams();

  const {
    listData: movies = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: genre });
  const {
    listData: series,
    isLoading: seriesLoading,
    error: seriesError,
  } = useFetchBasedOnGenreQuery({ type: "series", genres: genre });

  if (moviesLoading && seriesLoading) return <MainLoader />;

  if (!series?.length && !movies?.length) {
    return (
      <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 md:py-12 lg:py-20 lg:px-24 bg-[#0f0019] min-h-height-dvh">
        <h3 className="text-lg md:text-xl font-medium">
          Could not any movies and series
        </h3>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12  bg-[#0f0019] min-h-height-dvh">
      <div className="space-y-0.5 md:space-y-8 ">
        {movies?.length >= 1 && (
          <Row title={`${genre} Movies`} data={movies} error={moviesError} />
        )}

        {series?.length >= 1 && (
          <Row title={`${genre} Series`} data={series} error={seriesError} />
        )}
      </div>
    </section>
  );
};

export default Genre;

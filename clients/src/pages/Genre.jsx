import { useParams } from "react-router-dom";
import { useFetchBasedOnGenreQuery } from "../services/hooks/contentHooks";
import { Row } from "../components";

const Genre = () => {
  const { genre } = useParams();

  const {
    listData: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: genre });
  const {
    listData: series,
    isLoading: seriesLoading,
    error: seriesError,
  } = useFetchBasedOnGenreQuery({ type: "series", genres: genre });

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12 bg-[#0f0019]">
      <div className="space-y-0.5 md:space-y-8 ">
        <Row
          title={`${genre} Movies`}
          data={movies}
          isLoading={moviesLoading}
          error={moviesError}
        />

        <Row
          title={`${genre} Series`}
          data={series}
          isLoading={seriesLoading}
          error={seriesError}
        />
      </div>
    </section>
  );
};

export default Genre;

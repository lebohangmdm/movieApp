import {
  useFetchAllContents,
  useFetchBasedOnGenreQuery,
  useFetchBasedOnSortQuery,
} from "../services/hooks/contentHooks";
import Row from "./Row";

const Rows = () => {
  const {
    listData: series,
    isLoading: topSeriesLoading,
    error: topSeriesError,
  } = useFetchBasedOnSortQuery({ type: "series", sort: "-rating" });

  const {
    listData: movies,
    isLoading: topMoviesLoading,
    error: topMoviesError,
  } = useFetchBasedOnSortQuery({ type: "movie", sort: "-rating" });

  const {
    contents: newContents,
    isLoading: contentsLoading,
    error: contentsError,
  } = useFetchAllContents({ sort: "createdAt" });

  console.log(newContents);

  const {
    listData: animationSeries,
    isLoading: animationLoading,
    error: animationError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Animation" });
  console.log(animationSeries);

  const {
    listData: comedyMovies,
    isLoading: comedyLoading,
    error: comedyError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Comedy" });
  console.log(animationSeries);

  const {
    listData: scifiSeries,
    isLoading: scifiLoading,
    error: scifiError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Sci-Fi" });

  return (
    <section className="max-w-7xl mx-auto  py-12 px-4 md:px-8 lg:px-12 lg:py-16 bg-[#0f0019]">
      <div className="h-40 space-y-0.5 md:space-y-8 ">
        <Row
          title={"Top Movie"}
          data={movies}
          isLoading={topMoviesLoading}
          error={topMoviesError}
        />

        <Row
          title={"Top Series"}
          data={series}
          isLoading={topSeriesLoading}
          error={topSeriesError}
        />

        <Row
          title={"Animation"}
          data={animationSeries}
          isLoading={animationLoading}
          error={animationError}
        />
        <Row
          title={"New Releases"}
          data={newContents}
          isLoading={contentsLoading}
          error={contentsError}
        />
        <Row
          title={"Comedy Movies"}
          data={comedyMovies}
          isLoading={comedyLoading}
          error={comedyError}
        />
        <Row
          title={"Science Fiction"}
          data={scifiSeries}
          isLoading={scifiLoading}
          error={scifiError}
        />
      </div>
    </section>
  );
};

export default Rows;

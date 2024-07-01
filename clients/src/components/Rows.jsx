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
    error: topSeriesErrror,
  } = useFetchBasedOnSortQuery({ type: "series", sort: "-rating" });

  const {
    listData: movies,
    isLoading: topMoviesLoading,
    error: topMoviesErrror,
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
    <section className="max-w-7xl mx-auto  py-12 px-4 md:px-8 lg:px-12 lg:py-16">
      <div className="h-40 space-y-0.5 md:space-y-8 ">
        <Row title={"Top Movie"} data={movies} />
        <Row title={"Top Series"} data={series} />
        <Row title={"Animation"} data={animationSeries} />
        <Row title={"New Releases"} data={newContents} />
        <Row title={"Comedy Movies"} data={comedyMovies} />
        <Row title={"Science Fiction"} data={scifiSeries} />
      </div>
    </section>
  );
};

export default Rows;

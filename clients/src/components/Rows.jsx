import { useFetchBasedOnSortQuery } from "../services/hooks/contentHooks";
import Row from "./Row";

const Rows = () => {
  const {
    contents: series,
    isLoading: loadingTopSeries,
    error: errorTopSeries,
  } = useFetchBasedOnSortQuery({ type: "series", sort: "-rating" });
  const {
    contents: movies,
    isLoading: loadingTopMovies,
    error: errorTopMovies,
  } = useFetchBasedOnSortQuery({ type: "movie", sort: "-rating" });

  // console.log(isLoading, error);
  // console.log(series);
  return (
    <section className="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-12 lg:py-16">
      <div className="h-40 space-y-0.5 md:space-y-8 ">
        <Row title={"Top Movie"} data={movies} />
        <Row title={"Top Series"} data={series} />
        <Row title={"Top Series"} data={series} />
      </div>
    </section>
  );
};

export default Rows;

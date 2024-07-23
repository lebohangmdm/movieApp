import { Row } from "../components";
import {
  useFetchAllContents,
  useFetchBasedOnGenreQuery,
  useFetchBasedOnSortQuery,
} from "../services/hooks/contentHooks";

const Movies = () => {
  const {
    listData: comedyMovies,
    isLoading: comedyMoviesLoading,
    error: comedyMoviesError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Comedy" });

  const {
    listData: actionMovies,
    isLoading: actionMoviesLoading,
    error: actionMoviesError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Action" });

  const {
    listData: topMovies,
    isLoading: topMoviesLoading,
    error: topMoviesErrror,
  } = useFetchBasedOnSortQuery({ type: "movie", sort: "-rating" });

  const {
    contents: newMovies,
    isLoading: newMoviesLoading,
    error: newMoviesError,
  } = useFetchAllContents({ type: "movie", sort: "createdAt" });

  const {
    listData: horrorMovies,
    isLoading: horrorMoviesLoading,
    error: horrorMoviesError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Horror" });

  const {
    listData: familyMovies,
    isLoading: familyMoviesLoading,
    error: familyMoviesError,
  } = useFetchBasedOnGenreQuery({ type: "movie", genres: "Family" });

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12 bg-[#0f0019]">
      <div className="space-y-0.5 md:space-y-8 ">
        <Row title={"Top Movies"} data={topMovies} />
        <Row title={"New Movies"} data={newMovies} />
        <Row title={"Comedy Movies"} data={comedyMovies} />
        <Row title={"Action Movies"} data={actionMovies} />
        <Row title={"Horror Movies"} data={horrorMovies} />
        <Row title={"Family & Kids Movies"} data={familyMovies} />
      </div>
    </section>
  );
};

export default Movies;

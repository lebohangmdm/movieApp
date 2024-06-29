import { Row } from "../components";
import {
  useFetchBasedOnGenreQuery,
  useFetchBasedOnSortQuery,
} from "../services/hooks/contentHooks";
// import { useFetchList } from "../services/hooks/useListsHooks";
// import { useGetAllListQuery, useGetListQuery } from "../services/listsService";

const Series = () => {
  const {
    listData: topSeries,
    isLoading: topLoading,
    error: topErrror,
  } = useFetchBasedOnSortQuery({ type: "series", sort: "-rating" });

  const {
    listData: newSeries,
    isLoading: newLoading,
    error: newError,
  } = useFetchBasedOnSortQuery({ type: "series", sort: "createdAt" });

  const {
    listData: comedySeries,
    isLoading: comedyLoading,
    error: comedyError,
  } = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "Comedy",
  });

  const {
    listData: dramaSeries,
    isLoading: dramaLoading,
    error: dramaError,
  } = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "Drama",
  });

  const {
    listData: kidsSeries,
    isLoading: kidsLoading,
    error: kidsError,
  } = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "Animation",
  });

  console.log(comedySeries);
  //   const {
  //     listData: newSeries,
  //     isLoading: newLoading,
  //     error: newError,
  //   } = useFetchBasedOnSortQuery({ type: "series", sort: "" });

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12  bg-light-3">
      <div className="space-y-0.5 md:space-y-8 ">
        <Row title={"Top Series"} data={topSeries} />
        <Row title={"New Series"} data={newSeries} />
        <Row title={"Comedy Series"} data={comedySeries} />
        <Row title={"Drama Series"} data={dramaSeries} />
        <Row title={"Kids and Family"} data={kidsSeries} />
      </div>
    </section>
  );
};

export default Series;

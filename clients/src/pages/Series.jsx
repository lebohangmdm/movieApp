import { Row } from "../components";
import { useTopContent } from "../services/contentHooks";

const Series = () => {
  const {
    contents: series,
    isLoading: loadingTopSeries,
    error: errorTopSeries,
  } = useTopContent("series");

  return (
    <section className="max-w-7xl mx-auto py-4 px-4 md:px-8 lg:px-12 bg-light-3 md:py-6">
      <div className=" space-y-0.5 md:space-y-8 ">
        <Row title={"Top Series"} data={series} />
        <Row title={"Top Series"} data={series} />
        <Row title={"Top Series"} data={series} />
      </div>
    </section>
  );
};

export default Series;

import { useTopContent } from "../services/contentHooks";
import Row from "./Row";

const Rows = () => {
  const { contents: series, isLoading, error } = useTopContent("series");
  console.log(isLoading, error);
  return (
    <section className="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-12 lg:py-16">
      <div className="h-40 space-y-0.5 md:space-y-2">
        <Row title={"Top Series"} series={series} />
      </div>
    </section>
  );
};

export default Rows;

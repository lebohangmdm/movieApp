import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import RowContent from "./RowContent";
import Loader from "./Loader";
// import SectionLoader from "./SectionLoader";

const Row = ({ title, data, error, isLoading }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // if (isLoading) return <Loader />;
  if (error)
    return <p className="text-sm text-white">{error?.data?.message}</p>;

  return (
    <div className="">
      <h2 className="capitalize text-sm font-semibold text-[#e5e5e5] my-4 transition duration-200 hover:text-white  md:text-2xl">
        {/* {data?.length ? `${title}` : `0 ${title}`} */}
        {title}
      </h2>
      <div className="group relative md:ml-4">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 text-white left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide gap-x-4 md:gap-x-8"
        >
          {data?.map((content) => {
            return <RowContent key={content.id} content={content} />;
          })}
        </div>

        <ChevronRightIcon
          className={`absolute top-0 bottom-0 text-white right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;

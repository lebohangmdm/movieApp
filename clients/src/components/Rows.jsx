import { useEffect, useRef, useState } from "react";
import {
  useFetchAllContents,
  useFetchBasedOnGenreQuery,
  useFetchBasedOnSortQuery,
} from "../services/hooks/contentHooks";
import Row from "./Row";
import Loader from "./Loader";

const Rows = () => {
  const [visibleRows, setVisibleRows] = useState(2);
  const bottomRef = useRef(null);

  const topSeriesData = useFetchBasedOnSortQuery({
    type: "series",
    sort: "-rating",
  });

  const topMoviesData = useFetchBasedOnSortQuery({
    type: "movie",
    sort: "-rating",
  });

  const {
    contents: newContents,
    isLoading: contentsLoading,
    error: contentsError,
  } = useFetchAllContents({ sort: "createdAt" });

  console.log(newContents);

  const animatedMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "animation",
  });

  const comedyMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "comedy",
  });
  const dramaSeriesData = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "drama",
  });

  const scifiMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "sci-fi",
  });

  console.log(scifiMoviesData);
  const rows = [
    { title: "Top Movies", ...topMoviesData },
    { title: "Top Series", ...topSeriesData },
    { title: "Animation Movies", ...animatedMoviesData },
    { title: "Comedy Movies", ...comedyMoviesData },
    { title: "Drama Series", ...dramaSeriesData },
    { title: "Science Fiction", ...scifiMoviesData },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleRows < rows.length) {
          setVisibleRows((prev) => Math.min(prev + 1, rows.length));
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [visibleRows, rows.length]);

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12 bg-[#0f0019] min-h-height-dvh">
      <div className="space-y-0.5 md:space-y-8">
        {rows.slice(0, visibleRows).map((row) => {
          return (
            <Row
              key={row.title}
              title={row.title}
              data={row.listData}
              error={row.error}
            />
          );
        })}
        {visibleRows < rows.length && (
          <div
            ref={bottomRef}
            className="h-10 flex items-center justify-center"
          >
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default Rows;

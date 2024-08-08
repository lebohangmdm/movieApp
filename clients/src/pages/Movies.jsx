import { useEffect, useRef, useState } from "react";
import { Loader, Row } from "../components";
import {
  useFetchBasedOnGenreQuery,
  useFetchBasedOnSortQuery,
} from "../services/hooks/contentHooks";

const Movies = () => {
  const [visibleRows, setVisibleRows] = useState(2);
  const bottomRef = useRef(null);

  // Call all hooks unconditionally
  const comedyMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "comedy",
  });

  const actionMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "action",
  });

  const topMoviesData = useFetchBasedOnSortQuery({
    type: "movie",
    sort: "-rating",
  });

  const newMoviesData = useFetchBasedOnSortQuery({
    type: "movie",
    sort: "createdAt",
  });
  console.log(newMoviesData);

  const horrorMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "horror",
  });

  const familyMoviesData = useFetchBasedOnGenreQuery({
    type: "movie",
    genres: "family",
  });

  const rows = [
    { title: "Top Movies", ...topMoviesData },
    { title: "New Movies", ...newMoviesData },
    { title: "Action Movies", ...actionMoviesData },
    { title: "Comedy Movies", ...comedyMoviesData },
    { title: "Kids and Family", ...familyMoviesData },
    { title: "Horror", ...horrorMoviesData },
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

export default Movies;

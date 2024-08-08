import React, { useState, useEffect, useRef } from "react";
import { Loader, Row } from "../components";
import {
  useFetchBasedOnGenreQuery,
  useFetchBasedOnSortQuery,
} from "../services/hooks/contentHooks";

const Series = () => {
  const [visibleRows, setVisibleRows] = useState(2);
  const bottomRef = useRef(null);

  // Call all hooks unconditionally
  const topSeriesData = useFetchBasedOnSortQuery({
    type: "series",
    sort: "-rating",
  });

  const newSeriesData = useFetchBasedOnSortQuery({
    type: "series",
    sort: "createdAt",
  });
  const comedySeriesData = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "comedy",
  });
  const dramaSeriesData = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "drama",
  });
  const kidsSeriesData = useFetchBasedOnGenreQuery({
    type: "series",
    genres: "animation",
  });

  const rows = [
    { title: "Top Series", ...topSeriesData },
    { title: "New Series", ...newSeriesData },
    { title: "Comedy Series", ...comedySeriesData },
    { title: "Drama Series", ...dramaSeriesData },
    { title: "Kids and Family", ...kidsSeriesData },
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

export default Series;

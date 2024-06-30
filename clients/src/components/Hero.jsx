import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";
import { useFeaturedContent } from "../services/hooks/contentHooks";

const Hero = () => {
  const { contents: movies, isLoading, error } = useFeaturedContent();
  console.log(movies);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? movies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [movies, currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === movies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [movies, currentIndex]);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-rotate movies every 5 seconds
  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   //   nextSlide();
  //   // }, 5000);

  //   return () => clearInterval(interval);
  // }, [nextSlide]);

  return (
    <section className="z-0 relative group w-full h-height-dvh">
      <div
        style={{
          backgroundImage: `url(${movies?.[currentIndex].coverImage})`,
        }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-gray-500/20 text-white cursor-pointer">
        <ChevronLeftIcon className="w-9 h-9 text-white" onClick={prevSlide} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-gray-800/60 text-white cursor-pointer">
        <ChevronRightIcon className="w-9 h-9 text-white " onClick={nextSlide} />
      </div>
      <div className="absolute bottom-2 right-1/2 left-1/2 flex justify-center gap-2 ">
        {movies?.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-xl cursor-default ${slideIndex === currentIndex ? "text-purple-2" : "text-white"}`}
          >
            &#9679;
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

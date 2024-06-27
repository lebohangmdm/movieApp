import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";
import { useGetRandomMoviesQuery } from "../services/contentsService";

const Hero = () => {
  const slides = [
    {
      url: "https://m.media-amazon.com/images/M/MV5BY2U5YmQ3YjgtM2I2OC00YmM5LTkyM2MtN2I5Zjg2MDE0ODkwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];

  const { data, error, isLoading } = useGetRandomMoviesQuery();
  const contents = data?.data.contents;
  // console.log(contents);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [slides, currentIndex]);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [slides, currentIndex]);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className=" relative group w-full h-height-dvh">
      <div
        style={{
          backgroundImage: `url(https://images.savoysystems.co.uk/MPE/17357552.jpg)`,
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
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-xl text-white cursor-default ${slideIndex === currentIndex ? "text-white" : "text-gray-700"}`}
          >
            &#9679;
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

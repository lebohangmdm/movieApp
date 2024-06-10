// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Hero = () => {
  return (
    <section className="-z-10 relative  w-full h-screen overflow-hidden border-white border">
      <div className="">
        <video
          autoPlay
          muted
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2"
        >
          <source src="src\assets\trigger.mp4" type="video/mp4"></source>
        </video>
        <div className="z-10 text-light-1 absolute bottom-0 px-12">
          <h1 className="text-5xl font-semibold uppercase">Trigger</h1>
          <p className="mb-3 word-spacing-[-5px]">
            Drama
            <strong> &#183;</strong> 2h 31min{" "}
            <span className="text-sm">TV-Ma</span>
          </p>
          <p className="max-w-sm leading-normal mb-4">
            An FBI agent must find who killed the president, inside the
            organization
          </p>
          {/* <Link
            to={"/movies/1"}
            className="bg-light-1 text-black uppercase tracking-wide text-base font-semibold transform duration-300 ease-out py-3 px-8 rounded-md hover:bg-white cursor-pointer"
          >
            <PlayArrowIcon /> Play
          </Link> */}
          <Button variant="contained" color="primary">
            Play
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

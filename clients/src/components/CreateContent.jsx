import { CloudArrowUpIcon } from "@heroicons/react/20/solid";

const CreateContent = () => {
  const type = "series";
  const selectedImage = "photo";
  return (
    <div>
      <form action="" className="flex flex-col gap-y-4 md:gap-y-7">
        <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label className="text-sm">Title</label>
            <input
              type="text"
              className="text-sm  py-2 px-4 bg-transparent md:text-base"
            />
          </div>
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Duration
            </label>
            <input
              type="text"
              className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
              placeholder="126 min"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Release Year
            </label>
            <input
              type="text"
              className="text-sm  py-2 px-4 bg-transparent md:text-base "
              placeholder="2024"
            />
          </div>
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Release Date
            </label>
            <input
              type="text"
              className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
              placeholder="26 May 2024"
            />
          </div>
        </div>
        <div className="text-white flex flex-col gap-y-2 w-full  ">
          <label htmlFor="" className="text-sm">
            Description
          </label>
          <textarea
            name="description"
            cols="30"
            rows="3"
            className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
          ></textarea>
        </div>
        <div className="flex items-center justify-between lg:gap-16">
          <div className="text-white flex flex-col gap-y-2">
            <label htmlFor="media-select" className="text-white text-sm">
              Select Content Type:
            </label>
            <select
              id="media-select"
              // value={selectedOption}
              // onChange={handleChange}
              className="text-sm py-2 px-4 bg-black md:text-base"
            >
              <option
                value="movie"
                className="bg-black text-white text-sm md:text-base py-2 px-4"
              >
                Movie
              </option>
              <option
                value="series"
                className="bg-black text-white text-sm md:text-base py-2 px-4"
              >
                Series
              </option>
            </select>
          </div>
          {type && (
            <div className="text-white flex flex-col gap-y-2 w-52 lg:flex-1">
              <label htmlFor="" className="text-sm">
                Total Seasons
              </label>
              <input
                type="text"
                className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Directors
            </label>
            <input
              type="text"
              className="text-sm  py-2 px-4 bg-transparent md:text-base "
              placeholder="2024"
            />
          </div>
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Cast
            </label>
            <input
              type="text"
              className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
              placeholder="Pedro Pascal, Denzel Washington"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4  lg:flex-row lg:gap-y-0 lg:gap-x-8">
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Genres
            </label>
            <input
              type="text"
              className="text-sm  py-2 px-4 bg-transparent md:text-base "
              placeholder="Action, Thriller, Comedy"
            />
          </div>
          <div className="text-white flex flex-col gap-y-2 w-full lg:w-1/2 ">
            <label htmlFor="" className="text-sm">
              Trailer
            </label>
            <input
              type="text"
              className="text-sm w-full py-2 px-4 bg-transparent md:text-base"
              placeholder="https:youtube/ytkwnjse"
            />
          </div>
        </div>
        <div className="mx-auto lg:mx-0">
          <label className="w-full flex flex-col items-center lg:flex-row lg:gap-x-8 px-4 py-6 md:py-8 md:px-16 bg-black text-white rounded-lg shadow-lg  capitalize cursor-pointer hover:border hover:border-white hover:text-white">
            <CloudArrowUpIcon className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 md:mt-4 text-base leading-normal">
              Drag Your Image
            </span>
            <input
              type="file"
              className="hidden"
              // onChange={handleImageChange}
            />
          </label>

          {selectedImage && (
            <div className="mt-4">
              <img
                // src={selectedImage}
                alt="Preview"
                className="max-w-xs mx-auto lg:mx-0"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateContent;

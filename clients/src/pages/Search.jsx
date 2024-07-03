import { Link, useParams } from "react-router-dom";
import { useFetchContentByName } from "../services/hooks/contentHooks";
import { RowContent } from "../components";

const Search = () => {
  const { title } = useParams();
  const { contents, isLoading, error } = useFetchContentByName({ title });

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12">
      <div className="grid justify-center items-center md:grid-cols-3 gap-12 lg:grid-cols-4 ">
        {contents?.map((content) => {
          return (
            <Link key={content.id} to={`/watch/${content.id}`}>
              <div
                key={content.id}
                className="h-28  max-w-[180px] transition duration-200 ease-out md:h-28 md:max-w-[260px]"
                // className=" hover:scale-105 sm:max-w-[200px] transition duration-300 ease-out lg:hover:scale-125  cursor-pointer  "
              >
                <img
                  src={content.coverImage}
                  alt={content.title}
                  className="object-cover mx-auto "
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Search;

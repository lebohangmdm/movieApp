import { useParams } from "react-router-dom";
import { useFetchContentByName } from "../services/hooks/contentHooks";
import { RowContent } from "../components";

const Search = () => {
  const { title } = useParams();
  const { contents, isLoading, error } = useFetchContentByName({ title });
  console.log(contents);

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-12  bg-light-3">
      <div className="grid items-center md:grid-cols-2 gap-12 lg:grid-cols-3">
        {contents.map((content) => {
          return (
            <div
              key={content.id}
              className="h-28  max-w-[180px] cursor-pointer transition duration-200 ease-out md:h-52 md:max-w-[260px]"
            >
              <img
                src={content.coverImage}
                alt={content.title}
                className="object-cover mx-auto "
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Search;

import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../services/usersService";
import Loader from "./Loader";

const MyList = () => {
  const {
    data,
    isLoading: userLoading,
    error: userError,
  } = useGetProfileQuery();

  console.log(data);

  const contents = data?.data?.doc?.watchList;

  if (!contents || contents.length === 0)
    return (
      <h2 className="text-xl font-medium tracking-wider">
        Your watchList is empty
      </h2>
    );

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <div className="grid gap-8  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {contents?.map((content) => {
            return (
              <div
                key={content.id}
                // className="h-28  max-w-[180px] transition duration-200 ease-out md:h-32 md:max-w-[260px]"
                className="w-full sm:w-[90%] md:w-[80%] lg:[w-75%] mx-auto"
              >
                <Link key={content.id} to={`/watch/${content.id}`}>
                  <img
                    src={content.coverImage}
                    alt={content.title}
                    className="object-cover mx-auto "
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyList;

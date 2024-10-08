import { useGetProfileQuery } from "../services/usersService.js";
import ErrorMessage from "./ErrorMessage.jsx";
import RowContent from "./RowContent.jsx";
import MainLoader from "./MainLoader.jsx";

const MyList = () => {
  const {
    data,
    isLoading: userLoading,
    error: userError,
  } = useGetProfileQuery();

  console.log(data);

  const contents = data?.data?.doc?.watchList;
  console.log(contents);

  if (!contents || contents.length === 0)
    return (
      <h2 className="text-xl font-medium tracking-wider">
        Your watchList is empty
      </h2>
    );

  if (userError) return <ErrorMessage error={userError?.data?.message} />;

  return (
    <>
      {userLoading ? (
        <MainLoader />
      ) : (
        <div className="grid items-center justify-center gap-6 sm:grid-cols-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-12">
          {contents?.map((content) => {
            return <RowContent key={content.id} content={content} />;
          })}
        </div>
      )}
    </>
  );
};

export default MyList;

import { Link } from "react-router-dom";
import { useFetchAllContents } from "../services/hooks/contentHooks";

const MobileMenuCategory = () => {
  const { contents, error } = useFetchAllContents({
    sort: "createdAt",
  });

  const genres = [
    ...new Set(
      contents?.map((content) => [...content.genres]).flatMap((arr) => arr)
    ),
  ].sort((a, b) => a.localeCompare(b));

  if (error) return <ErrorMessage error={error?.data?.message} />;
  return (
    <ul className="grid grid-cols-4 items-center">
      {genres.map((genre) => {
        return (
          <li key={genre}>
            <Link to={`/genres/${genre}`} className="sub-link font-medium">
              {genre}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileMenuCategory;

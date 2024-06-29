import {
  useGetContentBasedOnGenresQuery,
  useGetContentBasedOnSortQuery,
  useGetFeaturedContentQuery,
} from "../contentsService";

export const useFetchBasedOnSortQuery = ({ type, sort }) => {
  const { data, isLoading, error } = useGetContentBasedOnSortQuery({
    type,
    sort,
    limit: "12",
  });

  const listData = data?.data.docs;

  return { listData, isLoading, error };
};

export const useFetchBasedOnGenreQuery = ({ type, genres }) => {
  const { data, isLoading, error } = useGetContentBasedOnGenresQuery({
    type,
    genres,
    limit: "12",
    sort: "createdAt",
  });

  const listData = data?.data.docs;

  return { listData, isLoading, error };
};

export const useFeaturedContent = () => {
  const { data, isLoading, error } = useGetFeaturedContentQuery({
    featured: true,
    sort: "createdAt",
    limit: 8,
  });

  const contents = data?.data.docs;

  return { contents, isLoading, error };
};

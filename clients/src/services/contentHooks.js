import {
  useGetFeaturedContentQuery,
  useGetTopContentQuery,
} from "./contentsService";

export const useTopContent = (type) => {
  const { data, isLoading, error } = useGetTopContentQuery({
    type: type,
    sort: "createdAt",
    limit: 10,
  });

  const contents = data?.data.docs;

  return { contents, isLoading, error };
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

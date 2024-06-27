import { useGetTopContentQuery } from "./contentsService";

export const useTopContent = (type) => {
  const { data, isLoading, error } = useGetTopContentQuery({
    type: type,
    sort: "-createdAt",
  });

  const contents = data?.data.docs;

  return { contents, isLoading, error };
};

import {
  useDeleteContentMutation,
  useGetAllContentBasedOnTypeQuery,
  useGetAllContentsQuery,
  useGetContentBasedOnGenresQuery,
  useGetContentBasedOnSortQuery,
  useGetContentByNameQuery,
  useGetContentQuery,
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

export const useFetchAllContents = ({ sort }) => {
  const { data, isLoading, error } = useGetAllContentsQuery({
    sort,
  });

  const contents = data?.data.docs;
  return { contents, isLoading, error };
};

export const useFetchAllContentBasedType = ({ sort }) => {
  const { data, isLoading, error } = useGetAllContentBasedOnTypeQuery({
    sort,
  });

  const contents = data?.data.docs;
  return { contents, isLoading, error };
};

export const useFetchContentByName = ({ title }) => {
  const { data, isLoading, error } = useGetContentByNameQuery({
    title,
  });

  const contents = data?.data.docs;
  return { contents, isLoading, error };
};

export const useFetchGetById = (id) => {
  const { data, isLoading, error } = useGetContentQuery(id);

  const content = data?.data?.doc;
  return { content, isLoading, error };
};

export const useDeleteContent = () => {
  const [deleteContent, { isLoading, error }] = useDeleteContentMutation();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deleteContent(id).unwrap();
      // Optionally handle redirection or state updates here
    } catch (err) {
      console.error("delete failed:", err);
    }
  };

  return { handleDelete, isLoading, error };
};

import { useLogoutMutation } from "../authService";
import { useGetProfileQuery } from "../usersService";

export const useFetchGetUser = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  const userData = data?.data;
  return { userData, isLoading, error };
};

export const useLogout = () => {
  const [logout, { isLoading: isLogout, error: errorLogout }] =
    useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Optionally handle redirection or state updates here
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    handleLogout,
    isLogout,
    errorLogout,
  };
};

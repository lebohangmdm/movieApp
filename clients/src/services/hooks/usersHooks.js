import { useLogoutMutation } from "../authService";
import { useGetAllUsersQuery, useGetProfileQuery } from "../usersService.js";

export const useFetchGetUser = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  const userData = data?.data;
  return { userData, isLoading, error };
};

export const useFetchAllUsers = () => {
  const { data, isLoading, error } = useGetAllUsersQuery({ sort: "createdAt" });

  const usersData = data?.data?.docs;
  return { usersData, isLoading, error };
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

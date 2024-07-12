import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Delete, Edit } from "@mui/icons-material";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../services/usersService";
import { useFetchAllUsers } from "../services/hooks/usersHooks";

const UsersTable = () => {
  const columns = [
    { id: "fullName", name: "FullName" },
    { id: "email", name: "Email" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const {
    usersData: users,
    isLoading,
    error,
  } = useFetchAllUsers({
    sort: "createdAt",
  });
  console.log(users);

  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  console.log(error);
  const navigate = useNavigate();
  const [
    deleteUser,
    {
      isSuccess: isSuccessDelete,
      isLoading: deleting,
      error: deleteError,
      isError: isErrorDelete,
    },
  ] = useDeleteUserMutation();

  const handleDelete = (id) => {
    deleteUser({ id });
  };

  useEffect(() => {
    let toastId; // Initialize a variable to store toast ID if needed

    if (isErrorDelete) {
      const errorMessage = deleteError?.data?.message || "An error occurred";
      toastId = toast.error(errorMessage); // Store the toast ID]\
    } else if (isSuccessDelete) {
      toastId = toast.success("User deleted successfully"); // Store the toast ID
      navigate(window.location.pathname, { replace: true });
    }

    // Cleanup function to be called on component unmount or before running the effect again
    return () => {
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast if it's still visible
      }
    };
  }, [isErrorDelete, isSuccessDelete, deleteError, navigate]);

  return (
    <div className="text-center">
      <h1>Users List</h1>

      {isLoading || deleting ? (
        <Loader />
      ) : (
        <Paper sx={{ width: "90%", marginLeft: "5%" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      style={{ backgroundColor: "black", color: "white" }}
                      key={column.id}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{ backgroundColor: "black", color: "white" }}
                    key={"action"}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, i) => {
                      console.log(row._id);
                      return (
                        <TableRow key={i + 1}>
                          {columns &&
                            columns.map((column) => {
                              let value = row[column.id];
                              return (
                                <>
                                  <TableCell
                                    key={value}
                                    sx={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                  >
                                    {value}
                                  </TableCell>
                                </>
                              );
                            })}

                          <TableCell
                            key={row._id}
                            sx={{
                              backgroundColor: "black",
                              color: "white",
                              display: "flex",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              onClick={() => console.log(row.id)}
                            >
                              <Edit sx={{ color: "green" }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(row._id)}
                            >
                              <Delete sx={{ color: "red" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ backgroundColor: "black", color: "white" }}
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowperpage}
            page={page}
            count={users?.length || 0}
            component="div"
            onPageChange={handlechangepage}
            onRowsPerPageChange={handleRowsPerPage}
          ></TablePagination>
        </Paper>
      )}
    </div>
  );
};

export default UsersTable;

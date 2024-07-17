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
import { useFetchAllContents } from "../services/hooks/contentHooks";
import { Delete, Edit } from "@mui/icons-material";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { useDeleteContentMutation } from "../services/contentsService";
import { Link } from "react-router-dom";

const ContentsTable = () => {
  const columns = [
    { id: "title", name: "Title" },
    { id: "type", name: "Type" },
    { id: "releaseYear", name: "Year" },
    { id: "duration", name: "Duration" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const { contents, isLoading, error } = useFetchAllContents({
    sort: "createdAt",
  });

  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  console.log(contents);
  const [
    deleteContent,
    {
      isSuccess: isSuccessDelete,
      isLoading: deleting,
      error: deleteError,
      isError: isErrorDelete,
    },
  ] = useDeleteContentMutation();

  const handleDelete = (id) => {
    deleteContent({ id });
  };

  useEffect(() => {
    let toastId; // Initialize a variable to store toast ID if needed

    // error for contents
    if (isErrorDelete) {
      const errorMessage = deleteError?.data?.message || "An error occurred";
      toastId = toast.error(errorMessage); // Store the toast ID]\
    } else if (isSuccessDelete) {
      toastId = toast.success("Content deleted successfully"); // Store the toast ID
    }

    // Cleanup function to be called on component unmount or before running the effect again
    return () => {
      if (toastId) {
        toast.dismiss(toastId); // Dismiss the toast if it's still visible
      }
    };
  }, [isErrorDelete, isSuccessDelete, deleteError, error]);

  return (
    <div className="text-center">
      <h1>Content List</h1>

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
                {contents &&
                  contents
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row) => {
                      return (
                        <TableRow key={row._id}>
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
                            key={row.id}
                            sx={{
                              backgroundColor: "black",
                              color: "white",
                              display: "flex",
                            }}
                          >
                            <Link to={`/update-content/${row._id}`}>
                              <IconButton aria-label="delete">
                                <Edit sx={{ color: "green" }} />
                              </IconButton>
                            </Link>
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
            count={contents?.length || 0}
            component="div"
            onPageChange={handlechangepage}
            onRowsPerPageChange={handleRowsPerPage}
          ></TablePagination>
        </Paper>
      )}
    </div>
  );
};

export default ContentsTable;

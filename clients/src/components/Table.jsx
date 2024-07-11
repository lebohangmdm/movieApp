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

const Muitable = () => {
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

  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const { contents, isLoading, error } = useFetchAllContents({
    sort: "createdAt",
  });

  useEffect(() => {
    rowchange(contents);
  }, [contents]);

  //   useEffect(() => {
  //     fetch("http://localhost:8000/employee")
  //       .then((resp) => {
  //         return resp.json();
  //       })
  //       .then((resp) => {
  //         rowchange(resp);
  //       })
  //       .catch((e) => {
  //         console.log(e.message);
  //       });
  //   }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>MUI Table</h1>

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
              {rows &&
                rows
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {columns &&
                          columns.map((column) => {
                            // console.log(column);
                            let value = row[column.id];

                            console.log(row.id);

                            // console.log(row["id"].slice(0, 5));
                            // console.log(value);
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
                          <IconButton aria-label="delete">
                            <Edit sx={{ color: "green" }} />
                          </IconButton>
                          <IconButton aria-label="delete">
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
          count={15}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </div>
  );
};

export default Muitable;

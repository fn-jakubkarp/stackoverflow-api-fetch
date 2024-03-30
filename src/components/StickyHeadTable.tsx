import { useState, useEffect, useMemo } from "react";

import { fetchTags } from "../api/fetchTags";
import { TagInfo } from "../types/TagInfo";
import { columns } from "../const/tableColumns";
import { useTableFunctions } from "../utils/tableUtils";
import { sortTags } from "../utils/sortTags";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { CircularProgress, Typography } from "@mui/material";

export default function StickyHeadTable() {
  const [tags, setTags] = useState<TagInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tags or post count", error);
        setError(
          "Error fetching tags or post count, please check try again later.",
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    orderBy,
    order,
    page,
    rowsPerPage,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTableFunctions();

  const sortedTags = useMemo(() => {
    return sortTags(tags, orderBy, order);
  }, [tags, orderBy, order]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {loading && <CircularProgress />}
      {error && (
        <Typography variant="h4" color="error">
          {error}
        </Typography>
      )}
      {!loading && !error && (
        <>
          <TablePagination
            sx={{ width: "100%" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={sortedTags.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTags
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((tag) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={tag.name}
                      >
                        {columns.map((column) => {
                          const value = tag[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
}

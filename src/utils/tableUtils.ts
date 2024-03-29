import { useState } from "react";
import { TagInfo } from "../types/TagInfo";

export const useTableFunctions = () => {
  const [orderBy, setOrderBy] = useState<keyof TagInfo>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property: keyof TagInfo) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return {
    orderBy,
    order,
    page,
    rowsPerPage,
    handleRequestSort,
    handleChangeRowsPerPage,
    handleChangePage,
  };
};

import React from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableSortLabel, TextField, Box,
  FormControl, InputLabel, Select, MenuItem, InputAdornment, Pagination, Typography
} from "@mui/material";
import { Search } from "@mui/icons-material";

const DataTable = ({
  title,
  rows,
  columns,
  order,
  orderBy,
  onRequestSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  search,
  setSearch,
  renderRow,
}) => {
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleSort = (property) => () => {
    onRequestSort(property);
  };

  const stableSort = (array, comparator) => {
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) =>
    order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl sx={{ width: 120 }}>
          <InputLabel>Số hàng</InputLabel>
          <Select value={rowsPerPage} onChange={onRowsPerPageChange} label="Số hàng">
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          label="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, index) => (
                renderRow ? (
                  renderRow(row, index, page, rowsPerPage) // 👈 gọi hàm render tùy chỉnh
                ) : (
                  <TableRow key={index}>
                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  </TableRow>
                )
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Paper>
  );
};

export default DataTable;

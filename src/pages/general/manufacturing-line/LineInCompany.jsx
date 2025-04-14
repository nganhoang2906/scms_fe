import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, TableRow, TableCell, Box, Button, } from "@mui/material";
import DataTable from "@components/content-components/DataTable";
import { useNavigate } from "react-router-dom";
import { getAllLinesInCompany } from "@services/general/ManufactureLineService";

const LineInCompany = () => {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("lineName");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchLines = async () => {
      setLoading(true);
      try {
        const result = await getAllLinesInCompany(companyId, token);
        setLines(result);
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi tải danh sách dây chuyền!");
      } finally {
        setLoading(false);
      }
    };

    if (companyId && token) {
      fetchLines();
    }
  }, [companyId, token]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const filteredLines = lines.filter((line) =>
    line.lineCode?.toLowerCase().includes(search.toLowerCase()) ||
    line.lineName?.toLowerCase().includes(search.toLowerCase()) ||
    line.plantName?.toLowerCase().includes(search.toLowerCase()) ||
    line.description?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { id: "plantName", label: "Tên xưởng" },
    { id: "lineCode", label: "Mã dây chuyền" },
    { id: "lineName", label: "Tên dây chuyền" },
    { id: "capacity", label: "Công suất" },
    { id: "description", label: "Mô tả" },
  ];

  if (lines.length === 0) return null;

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          DANH SÁCH DÂY CHUYỀN SẢN XUẤT
        </Typography>

        <Box mt={3} mb={3}>
          <Button variant="contained" color="default" onClick={() => navigate("/create-line")} >
            Thêm mới
          </Button>
        </Box>

        <DataTable
          rows={filteredLines}
          columns={columns}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          search={search}
          setSearch={setSearch}
          isLoading={loading}
          renderRow={(line) => (
            <TableRow key={line.id} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/line-detail/${line.lineId}`)}>
              <TableCell>{line.plantName}</TableCell>
              <TableCell>{line.lineCode}</TableCell>
              <TableCell>{line.lineName}</TableCell>
              <TableCell>{line.capacity}</TableCell>
              <TableCell>{line.description}</TableCell>
            </TableRow>
          )}
        />
      </Paper>
    </Container>
  );
};

export default LineInCompany;

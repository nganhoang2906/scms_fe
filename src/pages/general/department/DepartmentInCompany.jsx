import React, { useEffect, useState } from "react";
import { Container, TableRow, TableCell, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTable from "@components/content-components/DataTable";
import { getAllDepartmentsInCompany } from "@services/general/DepartmentService";

const DepartmentInCompany = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("departmentCode");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartmentsInCompany(companyId, token);
        setDepartments(data);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy danh sách phòng ban!");
      }
    };

    if (companyId && token) {
      fetchDepartments();
    }
  }, [companyId, token]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.departmentCode.toLowerCase().includes(search.toLowerCase()) ||
    dept.departmentName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { id: "departmentCode", label: "Mã phòng ban" },
    { id: "departmentName", label: "Tên phòng ban" },
  ];

  if (departments.length === 0) return null;

  return (
    <Container>
      <Paper className="paper-container" elevation={3} >
        <Typography className="page-title" variant="h4" >
          DANH SÁCH PHÒNG BAN
        </Typography>
        <DataTable
          rows={filteredDepartments}
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
          renderRow={(dept) => (
            <TableRow key={dept.departmentId} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/department-detail/${dept.departmentId}`)}
            >
              <TableCell>{dept.departmentCode}</TableCell>
              <TableCell>{dept.departmentName}</TableCell>
            </TableRow>
          )}
        />
      </Paper>
    </Container>
  );
};

export default DepartmentInCompany;

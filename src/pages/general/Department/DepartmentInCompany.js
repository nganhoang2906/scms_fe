import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, TableRow, TableCell, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataTable";

const DepartmentInCompany = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("departmentCode");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/comad/get-all-department-in-company/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng ban:", error);
      }
    };

    fetchDepartments();
  }, [companyId, token]);

  if (!departments) {
    return (
      <Container>
        <Typography variant="h6" mt={4}>Đang tải thông tin phòng ban...</Typography>
      </Container>
    );
  }

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

  return (
    <Container>
      <DataTable
        title="DANH SÁCH PHÒNG BAN"
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
        renderRow={(dept, index) => (
          <TableRow key={dept.departmentId}>
            <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
            <TableCell>
              <Link to={`/department-detail/${dept.departmentId}`}>
                {dept.departmentCode}
              </Link>
            </TableCell>
            <TableCell>{dept.departmentName}</TableCell>
          </TableRow>
        )}
      />
    </Container>
  );
};

export default DepartmentInCompany;

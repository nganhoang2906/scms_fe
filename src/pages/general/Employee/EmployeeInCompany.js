import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, TableRow, TableCell, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataTable";

const EmployeeInCompany = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("employeeCode");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/comad/get-all-employee-in-com/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      }
    };

    fetchEmployees();
  }, [companyId, token]);

  if (employees.length === 0) {
    return (
      <Container>
        <Typography variant="h6" mt={4}>Đang tải thông tin nhân viên...</Typography>
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

  const filteredEmployees = employees.filter((emp) =>
    emp.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
    (emp.employeeName && emp.employeeName.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { id: "employeeCode", label: "Mã nhân viên" },
    { id: "employeeName", label: "Tên nhân viên" },
    { id: "position", label: "Chức vụ" },
    { id: "gender", label: "Giới tính" },
    { id: "address", label: "Địa chỉ" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Số điện thoại" },
    { id: "dateOfBirth", label: "Ngày sinh" },
    { id: "avatar", label: "Avatar" },
    { id: "status", label: "Trạng thái" },
  ];

  return (
    <Container>
      <DataTable
        title="DANH SÁCH NHÂN VIÊN"
        rows={filteredEmployees}
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
        renderRow={(emp, index) => (
          <TableRow key={emp.employeeId}>
            <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
            <TableCell>
              <Link to={`/employee-detail/${emp.employeeId}`}>
                {emp.employeeCode}
              </Link>
            </TableCell>
            <TableCell>{emp.employeeName || ""}</TableCell>
            <TableCell>{emp.position || ""}</TableCell>
            <TableCell>{emp.gender || ""}</TableCell>
            <TableCell>{emp.address || ""}</TableCell>
            <TableCell>{emp.email || ""}</TableCell>
            <TableCell>{emp.phoneNumber || ""}</TableCell>
            <TableCell>{emp.dateOfBirth || ""}</TableCell>
            <TableCell>{emp.avatar || ""}</TableCell>
            <TableCell>{emp.status || ""}</TableCell>
          </TableRow>
        )}
      />
    </Container>
  );
};

export default EmployeeInCompany;

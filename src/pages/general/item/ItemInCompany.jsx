import React, { useEffect, useState } from "react";
import {
  Container,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from "@mui/material";
import DataTable from "@/components/content-components/DataTable";
import { getAllItemsInCompany } from "@/services/general/ItemService";
import { useNavigate } from "react-router-dom";

const ItemInCompany = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("itemCode");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItemsInCompany(companyId, token);
        setItems(data);
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi tải danh sách sản phẩm!");
      }
    };

    fetchItems();
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

  const filteredItems = items.filter((item) =>
    item.itemCode.toLowerCase().includes(search.toLowerCase()) ||
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { id: "itemCode", label: "Mã sản phẩm" },
    { id: "itemName", label: "Tên sản phẩm" },
    { id: "itemType", label: "Loại sản phẩm" },
    { id: "uom", label: "Đơn vị" },
    { id: "unitPrice", label: "Đơn giá" },
  ];

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          DANH SÁCH SẢN PHẨM
        </Typography>

        <DataTable
          rows={filteredItems}
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
          renderRow={(item) => (
            <TableRow
              key={item.itemId}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/item-detail/${item.itemId}`)}
            >
              <TableCell>{item.itemCode || ""}</TableCell>
              <TableCell>{item.itemName || ""}</TableCell>
              <TableCell>{item.itemType || ""}</TableCell>
              <TableCell>{item.uom || ""}</TableCell>
              <TableCell>{item.unitPrice?.toLocaleString("vi-VN") || ""}</TableCell>
            </TableRow>
          )}
        />
      </Paper>
    </Container>
  );
};

export default ItemInCompany;

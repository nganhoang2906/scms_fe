import React, { useState } from "react";
import { Container, Typography, Button, Grid, Paper, TableRow, TableCell, Box } from "@mui/material";
import DataTable from "@/components/content-components/DataTable";
import useExcelUpload from "@/hooks/useExcelUpload";
import { useNavigate } from "react-router-dom";
import { createItem } from "@/services/general/ItemService";

const CreateItemFromExcel = () => {
  const navigate = useNavigate();
  const { excelData: initialExcelData, handleExcelUpload } = useExcelUpload();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("itemCode");
  const [page, setPage] = useState(1);
  const companyId = localStorage.getItem("companyId");
  const token = localStorage.getItem("token");
  const [excelData, setExcelData] = useState(initialExcelData || []);
  const [fileName, setFileName] = useState("");

  const columns = [
    { id: "itemCode", label: "Mã mặt hàng" },
    { id: "itemName", label: "Tên mặt hàng" },
    { id: "itemType", label: "Loại mặt hàng" },
    { id: "uom", label: "Đơn vị tính" },
    { id: "technicalSpecifications", label: "Thông số kỹ thuật" },
    { id: "importPrice", label: "Giá nhập" },
    { id: "exportPrice", label: "Giá xuất" },
    { id: "description", label: "Mô tả" },
  ];

  const handleDataLoaded = (data) => {
    console.log("Dữ liệu đã được tải lên:", data);

    const mappedData = data.map((item) => ({
      itemCode: item["Mã hàng hóa"],
      itemName: item["Tên hàng hóa"],
      itemType: item["Loại hàng hóa"],
      uom: item["Đơn vị tính"],
      importPrice: item["Giá nhập"],
      exportPrice: item["Giá xuất"],
      technicalSpecifications: item["Thông số kỹ thuật"],
      description: item["Mô tả"],
    }));

    setExcelData(mappedData);
  };

  const handleSubmit = async () => {
    try {
      for (const item of excelData) {
        const newItemData = {
          companyId: companyId,
          itemCode: item.itemCode || "",
          itemName: item.itemName || "",
          itemType: item.itemType || "",
          uom: item.uom || "",
          importPrice: item.importPrice || "",
          exportPrice: item.exportPrice || "",
          technicalSpecifications: item.technicalSpecifications || "",
          description: item.description || "",
        };

        console.log("Thêm item:", newItemData);

        await createItem(companyId, newItemData, token);
      }

      alert("Thêm tất cả hàng hóa thành công!");
      navigate("/item-in-company");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi thêm hàng hóa!");
      alert("Lỗi khi thêm hàng hóa!");
    }
  };

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          NHẬP MẶT HÀNG TỪ EXCEL
        </Typography>

        <Grid container spacing={2} mt={3} mb={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Button variant="contained" color="default" component="label">
                Tải file Excel
                <input type="file" accept=".xlsx, .xls" hidden
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setFileName(e.target.files[0].name);
                      handleExcelUpload(e, handleDataLoaded);
                    }
                  }}
                />
              </Button>
              {fileName && (
                <Typography variant="body1" ml={1}>
                  {fileName}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {excelData.length > 0 && (
          <>
            <DataTable
              rows={excelData}
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={(property) => {
                const isAsc = orderBy === property && order === "asc";
                setOrder(isAsc ? "desc" : "asc");
                setOrderBy(property);
              }}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(_, newPage) => setPage(newPage + 1)}
              onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
              search={search}
              setSearch={setSearch}
              renderRow={(row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              )}
            />
            <Grid container spacing={2} mt={3} justifyContent="flex-end">
              <Grid item>
                <Button variant="contained" color="default" onClick={handleSubmit}>
                  Thêm tất cả
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="default" onClick={() => navigate("/item-in-company")}>
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CreateItemFromExcel;

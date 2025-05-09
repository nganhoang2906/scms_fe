import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTransferTicketById, updateTransferTicket } from "@/services/inventory/TransferTicketService";
import { getAllItemsInCompany } from "@/services/general/ItemService";
import TtForm from "@/components/inventory/TtForm";
import TtDetailTable from "@/components/inventory/TtDetailTable";
import LoadingPaper from "@/components/content-components/LoadingPaper";

const EditTt = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId");

  const [ticket, setTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({ ticketDetailErrors: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketData, itemData] = await Promise.all([
          getTransferTicketById(ticketId, token),
          getAllItemsInCompany(companyId, token),
        ]);

        setTicket({
          ...ticketData,
          ticketCode: ticketData.ticketCode || "",
          reason: ticketData.reason || "",
          fromWarehouseCode: ticketData.fromWarehouseCode || "",
          fromWarehouseName: ticketData.fromWarehouseName || "",
          toWarehouseCode: ticketData.toWarehouseCode || "",
          toWarehouseName: ticketData.toWarehouseName || "",
          status: ticketData.status || "",
        });

        setTicketDetails(ticketData.transferTicketDetails || []);
        setItems(itemData || []);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi khi tải dữ liệu phiếu điều chuyển!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticketId, companyId, token]);

  const validateForm = () => {
    const formErrors = {};
    if (!ticket.reason?.trim()) formErrors.reason = "Lý do không được để trống";
    if (!ticket.fromWarehouseCode) formErrors.fromWarehouseCode = "Phải chọn kho xuất";
    if (!ticket.toWarehouseCode) formErrors.toWarehouseCode = "Phải chọn kho nhập";
    if (!ticket.status?.trim()) formErrors.status = "Trạng thái không được để trống";
    return formErrors;
  };

  const validateTicketDetails = () => {
    const detailErrors = [];

    ticketDetails.forEach((detail, index) => {
      if (!detail.itemId) {
        detailErrors.push({ index, field: "itemId", message: "Phải chọn hàng hóa" });
      }
      if (detail.quantity < 0) {
        detailErrors.push({ index, field: "quantity", message: ">= 0" });
      }

    });
    return detailErrors;
  };

  const readOnlyFields = {
    ticketCode: true,
    fromWarehouseCode: true,
    toWarehouseCode: true,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    const ticketDetailErrors = validateTicketDetails();

    if (Object.keys(formErrors).length > 0 || ticketDetailErrors.length > 0) {
      setErrors({ ...formErrors, ticketDetailErrors });
      return;
    }

    try {
      const request = {
        reason: ticket.reason,
        fromWarehouseId: ticket.fromWarehouseId,
        toWarehouseId: ticket.toWarehouseId,
        status: ticket.status,
        transferTicketDetails: ticketDetails.map((detail) => ({
          itemId: detail.itemId,
          quantity: detail.quantity,
          note: detail.note,
        })),
      };

      await updateTransferTicket(ticket.ticketId, request, token);
      alert("Cập nhật phiếu chuyển kho thành công!");
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi cập nhật phiếu chuyển kho!");
    }
  };

  const handleCancel = () => {
    navigate("/transfer-ticket");
  };

  if (loading) {
    return <LoadingPaper title="CẬP NHẬT PHIẾU CHUYỂN KHO" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">CẬP NHẬT PHIẾU CHUYỂN KHO</Typography>

        <TtForm ticket={ticket} onChange={handleChange} errors={errors} readOnlyFields={readOnlyFields} setTicket={setTicket} />

        <Typography variant="h5" mt={3} mb={3}>
          Danh sách hàng hóa chuyển kho:
        </Typography>

        <TtDetailTable ticketDetails={ticketDetails} setTicketDetails={setTicketDetails} items={items} errors={errors.ticketDetailErrors} />

        <Grid container spacing={2} mt={3} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="default" onClick={handleSubmit}>
              Lưu
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="default" onClick={handleCancel}>
              Hủy
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EditTt;

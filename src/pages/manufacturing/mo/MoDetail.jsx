import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import MoForm from "@/components/manufacturing/MoForm";
import { getMoById, updateMo } from "@/services/manufacturing/MoService";
import { getAllItemsInCompany } from "@/services/general/ItemService";
import { getAllLinesInCompany } from "@/services/general/ManufactureLineService";
import { getAllProcessesInMo, updateProcess } from "@/services/manufacturing/ProcessService";
import LoadingPaper from "@/components/content-components/LoadingPaper";
import ProcessCard from "@/components/content-components/ProcessCard";
import dayjs from "dayjs";

const MoDetail = () => {
  const { moId } = useParams();
  const [mo, setMo] = useState(null);
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);
  const [processes, setProcesses] = useState([]);

  const navigate = useNavigate();

  const normalizeForDisplay = (data) => {
    const normalized = {};
    for (const key in data) {
      normalized[key] = data[key] ?? "";
    }
    return normalized;
  };

  useEffect(() => {
    const fetchMo = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getMoById(moId, token);
        const normalizedData = normalizeForDisplay(data);
        setMo(normalizedData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin công lệnh!");
      }
    };

    fetchMo();
  }, [moId]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");
      try {
        const itemsData = await getAllItemsInCompany(companyId, token);
        setItems(itemsData);

        const linesData = await getAllLinesInCompany(companyId, token);
        setLines(linesData);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi khi lấy dữ liệu!");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProcesses = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getAllProcessesInMo(moId, token);
        const sorted = data.sort((a, b) => a.stageDetailOrder - b.stageDetailOrder);
        setProcesses(sorted);
      } catch (error) {
        alert(error.response?.data?.message || "Có lỗi khi lấy process!");
      }
    };

    fetchProcesses();
  }, [moId]);

  const handleConfirm = (type, id) => {
    navigate(`/check-inventory/${type}/${id}`);
  };

  const handleCancelMo = async () => {
    const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy công lệnh này không?");
    if (!confirmCancel) return;

    const token = localStorage.getItem("token");
    try {
      const payload = {
        ...mo,
        status: "Đã hủy"
      };
      await updateMo(moId, payload, token);
      alert("Đã hủy công lệnh!");

      setMo((prev) => ({
        ...prev,
        status: "Đã hủy",
      }));

    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi khi hủy công lệnh!");
    }
  };

  const handleEditClick = () => {
    if (mo.status === "Chờ xác nhận") {
      navigate(`/mo/${moId}/edit`);
    } else {
      alert("Chỉ công lệnh ở trạng thái 'Chờ xác nhận' mới được chỉnh sửa!");
    }
  };

  const handleCompleteProcess = async (currentProcess) => {
    const token = localStorage.getItem("token");
    const now = dayjs().format("YYYY-MM-DDTHH:mm:ss");

    try {
      await updateProcess(currentProcess.id, {
        moId,
        stageDetailId: currentProcess.stageDetailId,
        startedOn: currentProcess.startedOn,
        finishedOn: now,
        status: "Đã hoàn thành",
      }, token);

      const currentIndex = processes.findIndex(p => p.id === currentProcess.id);
      const nextProcess = processes[currentIndex + 1];

      if (nextProcess) {
        await updateProcess(nextProcess.id, {
          moId,
          stageDetailId: nextProcess.stageDetailId,
          startedOn: now,
          status: "Đang thực hiện",
        }, token);
      } else {
        await updateMo(moId, {
          ...mo,
          status: "Đã hoàn thành",
        }, token);

        setMo((prevMo) => ({
          ...prevMo,
          status: "Đã hoàn thành"
        }));
      }

      const updatedProcesses = await getAllProcessesInMo(moId, token);
      const sorted = updatedProcesses.sort((a, b) => a.stageDetailOrder - b.stageDetailOrder);
      setProcesses(sorted);

    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi khi cập nhật process!");
    }
  };


  const readOnlyFields = {
    moCode: true,
    status: true,
    itemId: true,
    lineId: true,
    type: true,
    quantity: true,
    estimatedStartTime: true,
    estimatedEndTime: true,
  };

  if (!mo) {
    return <LoadingPaper title="THÔNG TIN CÔNG LỆNH" />;
  }

  return (
    <Container>
      <Paper className="paper-container" elevation={3}>
        <Typography className="page-title" variant="h4">
          THÔNG TIN CÔNG LỆNH
        </Typography>

        <Box mt={3} mb={3} display="flex" justifyContent="space-between" gap={2}>
          <Box display="flex" gap={2}>
            <Button variant="contained" color="info" onClick={() => navigate(`/bom/${mo.itemId}`)}>
              Xem BOM
            </Button>
          </Box>

          {mo.status === "Chờ xác nhận" && (
            <Box display="flex" gap={2}>
              <Button variant="contained" color="success" onClick={() => handleConfirm("mo", mo.moId)}>
                Xác nhận
              </Button>
              <Button variant="contained" color="error" onClick={handleCancelMo}>
                Hủy
              </Button>
            </Box>
          )}
        </Box>

        <MoForm mo={mo} onChange={() => { }} errors={{}} readOnlyFields={readOnlyFields} items={items} lines={lines} setMo={setMo} />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="default" onClick={handleEditClick}>
            Sửa
          </Button>
        </Box>

        {(mo.status !== "Chờ xác nhận" && mo.status !== "Đã hủy") && (
          <>
            <Typography variant="h5" mt={2} mb={2}>
              Công đoạn sản xuất:
            </Typography>

            <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
              {processes.map((process) => (
                <Box key={process.stageDetailOrder} sx={{ flexShrink: 0 }}>
                  <ProcessCard process={process} onComplete={(p) => handleCompleteProcess(p)} />
                </Box>
              ))}
            </Box>
          </>
        )}

      </Paper>
    </Container>
  );
};

export default MoDetail;

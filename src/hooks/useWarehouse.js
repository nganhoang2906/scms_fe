import { useState, useEffect, useCallback } from "react";
import {
  getAllWarehousesInCompany,
  getWarehouseById,
  createWarehouse,
  updateWarehouse
} from "@services/general/WarehouseService";

const useWarehouse = (companyId, token) => {
  const [warehouses, setWarehouses] = useState([]);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllWarehouses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllWarehousesInCompany(companyId, token);
      setWarehouses(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [companyId, token]);

  const getWarehouse = useCallback(async (warehouseId) => {
    setLoading(true);
    try {
      const data = await getWarehouseById(warehouseId, token);
      setWarehouse(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addWarehouse = async (newWarehouse) => {
    const created = await createWarehouse(companyId, newWarehouse, token);
    setWarehouses((prev) => [...prev, created]);
  };

  const editWarehouse = async (warehouseId, updatedData) => {
    const updated = await updateWarehouse(warehouseId, updatedData, token);
    setWarehouses((prev) =>
      prev.map((wh) => (wh.id === warehouseId ? updated : wh))
    );
  };

  useEffect(() => {
    if (companyId) {
      getAllWarehouses();
    }
  }, [companyId, getAllWarehouses]);

  return {
    warehouse,
    warehouses,
    loading,
    error,
    getAllWarehouses,
    getWarehouse,
    addWarehouse,
    editWarehouse,
  };
};

export default useWarehouse;

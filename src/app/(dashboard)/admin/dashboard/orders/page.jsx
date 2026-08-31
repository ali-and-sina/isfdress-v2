"use client";
import { useState, useMemo, useCallback } from "react";
import useSWR, { mutate } from "swr";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";
import DataToolbar from "@/components/dashboard/DataToolbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

const STATUS_MAP = {
  pending: { label: "در انتظار پرداخت", color: "warning" },
  paid: { label: "پرداخت شده", color: "info" },
  shipped: { label: "ارسال شده", color: "primary" },
  delivered: { label: "تحویل داده شده", color: "success" },
  cancelled: { label: "لغو شده", color: "error" },
};

function formatToman(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

export default function OrdersPage() {
  const { data, isLoading } = useSWR("/api/admin/orders", fetcher);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState([]);
  const [toast, setToast] = useState(null);

  const rows = useMemo(() => {
    const list = data?.orders || [];
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter(
      (o) =>
        String(o.id).includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.customerPhone?.includes(q)
    );
  }, [data, search]);

  const handleStatusChange = useCallback(async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      mutate("/api/admin/orders");
      setToast({ severity: "success", message: "وضعیت سفارش بروزرسانی شد" });
    } catch {
      setToast({ severity: "error", message: "بروزرسانی وضعیت با خطا مواجه شد" });
    }
  }, []);

  const handleExport = useCallback(() => {
    const header = ["شناسه سفارش", "مشتری", "تلفن", "مبلغ", "وضعیت", "تاریخ"];
    const csvRows = rows.map((o) => [
      o.id,
      o.customerName,
      o.customerPhone,
      o.total,
      STATUS_MAP[o.status]?.label || o.status,
      o.createdAt,
    ]);
    const csv = [header, ...csvRows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [rows]);

  const columns = [
    { field: "id", headerName: "شناسه سفارش", width: 110 },
    { field: "customerName", headerName: "مشتری", flex: 1, minWidth: 150 },
    { field: "customerPhone", headerName: "شماره تماس", width: 140 },
    {
      field: "total",
      headerName: "مبلغ",
      width: 150,
      renderCell: (params) => formatToman(params.value),
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 190,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          sx={{ minWidth: 160 }}
          renderValue={(value) => (
            <Chip
              size="small"
              label={STATUS_MAP[value]?.label}
              color={STATUS_MAP[value]?.color}
              variant="outlined"
            />
          )}
        >
          {Object.entries(STATUS_MAP).map(([key, { label }]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "createdAt",
      headerName: "تاریخ ثبت",
      width: 140,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("fa-IR"),
    },
  ];

  return (
    <Box>
      <DataToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="جستجو بر اساس نام یا شماره تماس..."
        selectedCount={selection.length}
        onExport={handleExport}
      />

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selection}
          onRowSelectionModelChange={setSelection}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{ border: "none" }}
        />
      </Paper>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

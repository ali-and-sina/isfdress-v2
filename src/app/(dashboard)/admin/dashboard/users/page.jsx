"use client";
import { useState, useMemo, useCallback } from "react";
import useSWR, { mutate } from "swr";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import DataToolbar from "@/components/dashboard/dashboard/DataToolbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const { data, isLoading } = useSWR("/api/admin/users", fetcher);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState({
    type: "include",
    ids: new Set(),
  });
  const [confirmBlock, setConfirmBlock] = useState(null);
  const [toast, setToast] = useState(null);

  const rows = useMemo(() => {
    const list = data?.users || [];
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter(
      (u) =>
        u.fullName?.toLowerCase().includes(q) ||
        u.phone?.includes(q) ||
        u.email?.toLowerCase().includes(q),
    );
  }, [data, search]);

  const handleRoleChange = useCallback(async (userId, newRole) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error();
      mutate("/api/admin/users");
      setToast({ severity: "success", message: "نقش کاربر بروزرسانی شد" });
    } catch {
      setToast({ severity: "error", message: "بروزرسانی نقش با خطا مواجه شد" });
    }
  }, []);

  const handleBulkBlock = useCallback(async (ids, blocked) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, blocked }),
      });
      if (!res.ok) throw new Error();
      mutate("/api/admin/users");
      setSelection([]);
      setToast({
        severity: "success",
        message: blocked ? "کاربران مسدود شدند" : "کاربران رفع مسدودی شدند",
      });
    } catch {
      setToast({ severity: "error", message: "عملیات با خطا مواجه شد" });
    } finally {
      setConfirmBlock(null);
    }
  }, []);

  const handleExport = useCallback(() => {
    const header = ["شناسه", "نام", "تلفن", "ایمیل", "نقش", "وضعیت"];
    const csvRows = rows.map((u) => [
      u.id,
      u.fullName,
      u.phone,
      u.email || "-",
      u.role === "admin" ? "مدیر" : "مشتری",
      u.blocked ? "مسدود" : "فعال",
    ]);
    const csv = [header, ...csvRows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [rows]);

  const columns = [
    { field: "id", headerName: "شناسه", width: 70 },
    { field: "fullName", headerName: "نام کامل", flex: 1, minWidth: 160 },
    { field: "phone", headerName: "شماره تماس", width: 140 },
    { field: "email", headerName: "ایمیل", width: 180 },
    {
      field: "role",
      headerName: "نقش",
      width: 150,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.value}
          onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="customer">مشتری</MenuItem>
          <MenuItem value="admin">مدیر</MenuItem>
        </Select>
      ),
    },
    {
      field: "blocked",
      headerName: "وضعیت حساب",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            size="small"
            checked={!params.value}
            onChange={(e) =>
              setConfirmBlock({
                ids: [params.row.id],
                blocked: !e.target.checked,
              })
            }
          />
          <Chip
            size="small"
            label={params.value ? "مسدود" : "فعال"}
            color={params.value ? "error" : "success"}
            variant="outlined"
          />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <DataToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="جستجو بر اساس نام، تلفن یا ایمیل..."
        selectedCount={selection.ids.size}
        onExport={handleExport}
        extraActions={
          selection.ids.size > 0 && (
            <Button
              size="small"
              color="warning"
              variant="outlined"
              onClick={() => setConfirmBlock({ ids: selection, blocked: true })}
            >
              مسدودسازی گروهی
            </Button>
          )
        }
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

      <Dialog open={!!confirmBlock} onClose={() => setConfirmBlock(null)}>
        <DialogTitle>
          {confirmBlock?.blocked ? "مسدودسازی کاربر" : "رفع مسدودیت کاربر"}
        </DialogTitle>
        <DialogContent>
          آیا از {confirmBlock?.blocked ? "مسدود کردن" : "رفع مسدودیت"}{" "}
          {confirmBlock?.ids.length} کاربر مطمئن هستید؟
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmBlock(null)}>انصراف</Button>
          <Button
            color={confirmBlock?.blocked ? "error" : "success"}
            variant="contained"
            onClick={() =>
              handleBulkBlock(confirmBlock.ids, confirmBlock.blocked)
            }
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>

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

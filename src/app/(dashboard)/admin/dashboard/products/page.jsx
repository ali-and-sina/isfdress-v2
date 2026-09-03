"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DataToolbar from "@/components/dashboard/dashboard/DataToolbar";

const fetcher = (url) => fetch(url).then((res) => res.json());

function formatToman(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

export default function ProductsPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/admin/products", fetcher);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState({
    type: "include",
    ids: new Set(),
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const rows = useMemo(() => {
    const list = data?.products || [];
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        String(p.id).includes(q),
    );
  }, [data, search]);

  const handleDelete = useCallback(async (ids) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) throw new Error();
      setToast({ severity: "success", message: `${ids.length} محصول حذف شد` });
      setSelection([]);
      mutate("/api/admin/products");
    } catch {
      setToast({ severity: "error", message: "حذف محصول با خطا مواجه شد" });
    } finally {
      setConfirmDelete(null);
    }
  }, []);

  const handleExport = useCallback(() => {
    const list = rows;
    const header = ["شناسه", "نام", "دسته", "قیمت", "موجودی"];
    const csvRows = list.map((p) => [
      p.id,
      p.name,
      p.category,
      p.price,
      p.stock,
    ]);
    const csv = [header, ...csvRows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [rows]);

  const columns = [
    { field: "id", headerName: "شناسه", width: 80 },
    {
      field: "name",
      headerName: "نام محصول",
      flex: 1,
      minWidth: 200,
    },
    { field: "category", headerName: "دسته‌بندی", width: 140 },
    {
      field: "price",
      headerName: "قیمت",
      width: 140,
      renderCell: (params) => formatToman(params.value),
    },
    {
      field: "stock",
      headerName: "موجودی",
      width: 110,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value > 0 ? params.value : "ناموجود"}
          color={params.value > 0 ? "success" : "error"}
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="ویرایش">
            <IconButton
              size="small"
              onClick={() =>
                router.push(`/dashboard/products/${params.row.id}`)
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton
              size="small"
              color="error"
              onClick={() => setConfirmDelete({ ids: [params.row.id] })}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <DataToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="جستجوی محصول..."
        selectedCount={selection.ids.size}
        onBulkDelete={() => setConfirmDelete({ ids: selection })}
        onExport={handleExport}
        addLabel="محصول جدید"
        addHref="/dashboard/products/new"
      />

      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // loading={isLoading}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selection}
          onRowSelectionModelChange={setSelection}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          sx={{ border: "none" }}
        />
      </Paper>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>حذف محصول</DialogTitle>
        <DialogContent>
          آیا از حذف {confirmDelete?.ids.length} محصول مطمئن هستید؟ این عملیات
          قابل بازگشت نیست.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>انصراف</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(confirmDelete.ids)}
          >
            حذف
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

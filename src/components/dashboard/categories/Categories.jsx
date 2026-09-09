"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
import Typography from "@mui/material/Typography";

import { DataGrid } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import DataToolbar from "@/components/dashboard/dashboard/DataToolbar";
import { deleteCategory } from "@/actions/category.actions";

export default function Categories({ categories }) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [selection, setSelection] = useState({
    type: "include",
    ids: new Set(),
  });

  const [confirmDelete, setConfirmDelete] = useState(null);

  const [toast, setToast] = useState(null);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return categories;

    return categories.filter(
      (category) =>
        category.name?.toLowerCase().includes(q) ||
        category.slug?.toLowerCase().includes(q) ||
        String(category.id).includes(q),
    );
  }, [categories, search]);

  const columns = [
    {
      field: "id",
      headerName: "شناسه",
      width: 80,
    },

    {
      field: "image_url",
      headerName: "تصویر",
      width: 90,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Box
          component="img"
          src={params.value || "/images/placeholder.png"}
          alt={params.row.name || "دسته‌بندی"}
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            objectFit: "cover",
            my: 0.5,
          }}
        />
      ),
    },

    {
      field: "name",
      headerName: "نام دسته‌بندی",
      flex: 1,
      minWidth: 180,
    },

    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      minWidth: 180,
    },

    {
      field: "parent_id",
      headerName: "دسته والد",
      width: 130,

      renderCell: (params) => {
        if (!params.value) {
          return <Chip label="دسته اصلی" size="small" variant="outlined" />;
        }

        return (
          <Chip label={`ID: ${params.value}`} size="small" variant="outlined" />
        );
      },
    },

    {
      field: "actions",
      headerName: "عملیات",
      width: 110,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
          }}
        >
          <Tooltip title="ویرایش">
            <IconButton
              size="small"
              onClick={() =>
                router.push(`/admin/dashboard/categories/${params.row.id}`)
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="حذف">
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                setConfirmDelete({
                  ids: [params.row.id],
                })
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const selectedIds = Array.from(selection.ids);

  return (
    <Box>
      <DataToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="جستجوی دسته‌بندی..."
        selectedCount={selection.ids.size}
        onBulkDelete={() =>
          setConfirmDelete({
            ids: selectedIds,
          })
        }
        addLabel="دسته‌بندی جدید"
        addHref="/admin/dashboard/categories/new"
      />

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              دسته‌بندی‌ها
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              مدیریت دسته‌بندی‌های فروشگاه
            </Typography>
          </Box>

          <Chip label={`${categories.length} دسته‌بندی`} variant="outlined" />
        </Box>

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
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            border: "none",
          }}
        />
      </Paper>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>حذف دسته‌بندی</DialogTitle>

        <DialogContent>
          آیا از حذف <strong>{confirmDelete?.ids.length ?? 0}</strong> دسته‌بندی
          مطمئن هستید؟
          <Box
            component="span"
            sx={{
              display: "block",
              mt: 1,
              color: "text.secondary",
            }}
          >
            این عملیات قابل بازگشت نیست.
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>انصراف</Button>

          <Button
            color="error"
            variant="contained"
            disabled={!confirmDelete?.ids.length}
            onClick={deleteCategory}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert severity={toast?.severity} onClose={() => setToast(null)}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

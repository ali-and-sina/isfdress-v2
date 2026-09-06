"use client";

import { useMemo, useState } from "react";

import {
  Box,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { formatPrice } from "@/lib/products";
import { useRouter } from "next/navigation";

const statusConfig = {
  processing: {
    label: "در حال پردازش",
    color: "warning",
  },

  shipped: {
    label: "ارسال شده",
    color: "info",
  },

  delivered: {
    label: "تحویل شده",
    color: "success",
  },

  cancelled: {
    label: "لغو شده",
    color: "error",
  },
};

export default function OrdersClient({ orders }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [selection, setSelection] = useState({
    type: "include",
    ids: new Set(),
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const rows = useMemo(() => {
    let filteredOrders = orders;

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      filteredOrders = filteredOrders.filter(
        (order) =>
          order.customer.toLowerCase().includes(query) ||
          String(order.id).includes(query),
      );
    }

    if (status !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status,
      );
    }

    return filteredOrders;
  }, [search, status]);

  function handleDelete(ids) {
    setToast({
      severity: "success",
      message: `${selection.ids.size} سفارش حذف شد`,
    });

    setSelection([]);
    setConfirmDelete(null);
  }

  const columns = [
    {
      field: "id",
      headerName: "شماره سفارش",
      width: 130,
    },

    {
      field: "customer",
      headerName: "مشتری",
      flex: 1,
      minWidth: 170,
    },

    {
      field: "phone",
      headerName: "شماره تماس",
      width: 150,
    },

    {
      field: "items",
      headerName: "تعداد محصول",
      width: 120,
    },

    {
      field: "total",
      headerName: "مبلغ سفارش",
      width: 180,

      renderCell: (params) => formatPrice(params.value),
    },

    {
      field: "status",
      headerName: "وضعیت",
      width: 150,

      renderCell: (params) => {
        const config = statusConfig[params.value];

        return (
          <Chip
            size="small"
            label={config.label}
            color={config.color}
            variant="outlined"
          />
        );
      },
    },

    {
      field: "date",
      headerName: "تاریخ ثبت",
      width: 140,
    },

    {
      field: "actions",
      headerName: "عملیات",
      width: 120,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Tooltip title="مشاهده سفارش">
            <IconButton
              size="small"
              onClick={() =>
                router.push(`/admin/dashboard/orders/${params.row.id}`)
              }
            >
              <VisibilityOutlinedIcon fontSize="small" />
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
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          سفارش‌ها
        </Typography>

        <Typography color="text.secondary">
          مدیریت و پیگیری سفارش‌های فروشگاه
        </Typography>
      </Box>

      {/* Toolbar */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          justifycontent="space-between"
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            <TextField
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی سفارش یا مشتری..."
              slotProps={{
                input: {
                  startAdornment: (
                    <SearchOutlinedIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                      }}
                    />
                  ),
                },
              }}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 280,
                },
              }}
            />

            <TextField
              select
              size="small"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 180,
                },
              }}
            >
              <MenuItem value="all">همه وضعیت‌ها</MenuItem>

              <MenuItem value="processing">در حال پردازش</MenuItem>

              <MenuItem value="shipped">ارسال شده</MenuItem>

              <MenuItem value="delivered">تحویل شده</MenuItem>

              <MenuItem value="cancelled">لغو شده</MenuItem>
            </TextField>
          </Stack>

          {selection.length > 0 && (
            <Button
              color="error"
              variant="outlined"
              onClick={() =>
                setConfirmDelete({
                  ids: selection,
                })
              }
            >
              حذف {selection.length} سفارش
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Table */}

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
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

      {/* Order Details */}

      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>جزئیات سفارش</DialogTitle>

        <DialogContent>
          {selectedOrder && (
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  شماره سفارش
                </Typography>

                <Typography fontWeight={600}>#{selectedOrder.id}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  مشتری
                </Typography>

                <Typography fontWeight={600}>
                  {selectedOrder.customer}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  شماره تماس
                </Typography>

                <Typography fontWeight={600}>{selectedOrder.phone}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  مبلغ سفارش
                </Typography>

                <Typography fontWeight={600}>
                  {formatPrice(selectedOrder.total)}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1 }}
                >
                  وضعیت سفارش
                </Typography>

                <Chip
                  label={statusConfig[selectedOrder.status].label}
                  color={statusConfig[selectedOrder.status].color}
                />
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedOrder(null)}>بستن</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>حذف سفارش</DialogTitle>

        <DialogContent>
          آیا از حذف {confirmDelete?.ids.length} سفارش مطمئن هستید؟ این عملیات
          قابل بازگشت نیست.
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>انصراف</Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(confirmDelete?.ids)}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}

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

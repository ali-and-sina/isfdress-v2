"use client";

import { useRouter } from "next/navigation";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { DataGrid } from "@mui/x-data-grid";

const statusMap = {
  pending: {
    label: "در انتظار",
    color: "warning",
  },
  paid: {
    label: "پرداخت شده",
    color: "info",
  },
  shipped: {
    label: "ارسال شده",
    color: "primary",
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

export default function UserDetailsClient({ user, orders, stats }) {
  const router = useRouter();

  const status = user.deleted_at
    ? {
        label: "حذف شده",
        color: "error",
      }
    : {
        label: "فعال",
        color: "success",
      };

  const orderColumns = [
    {
      field: "id",
      headerName: "شماره سفارش",
      width: 130,
    },

    {
      field: "status",
      headerName: "وضعیت",
      width: 150,
      renderCell: (params) => {
        const item = statusMap[params.value];

        return (
          <Chip
            size="small"
            color={item?.color || "default"}
            label={item?.label || params.value}
          />
        );
      },
    },

    {
      field: "total_price",
      headerName: "مبلغ",
      width: 180,
      valueGetter: (value) => {
        return `${Number(value).toLocaleString("fa-IR")} تومان`;
      },
    },

    {
      field: "created_at",
      headerName: "تاریخ",
      flex: 1,
      minWidth: 180,
      valueGetter: (value) => {
        return value ? new Date(value).toLocaleDateString("fa-IR") : "-";
      },
    },

    {
      field: "actions",
      headerName: "مشاهده",
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => router.push(`/admin/orders/${params.row.id}`)}
        >
          مشاهده
        </Button>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      {/* Header */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignitems={{
          xs: "flex-start",
          sm: "center",
        }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => router.back()}
            sx={{ mb: 1 }}
          >
            بازگشت
          </Button>

          <Typography variant="h4" fontWeight={700}>
            جزئیات کاربر
          </Typography>
        </Box>
      </Stack>

      {/* User information */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          alignitems={{
            xs: "flex-start",
            sm: "center",
          }}
        >
          <Avatar
            src={user.avatar_url || undefined}
            alt={user.name || "کاربر"}
            sx={{
              width: 90,
              height: 90,
              fontSize: 32,
            }}
          >
            {user.name?.charAt(0)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              spacing={1}
              alignitems="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="h5" fontWeight={700}>
                {user.name || "بدون نام"}
              </Typography>

              <Chip size="small" color={status.color} label={status.label} />
            </Stack>

            <Typography color="text.secondary">{user.email}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              شناسه کاربر
            </Typography>

            <Typography fontWeight={600}>#{user.id}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              روش ورود
            </Typography>

            <Typography fontWeight={600}>
              {user.google_id ? "Google" : "ایمیل"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              تاریخ عضویت
            </Typography>

            <Typography fontWeight={600}>
              {new Date(user.created_at).toLocaleDateString("fa-IR")}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="body2" color="text.secondary">
              وضعیت حساب
            </Typography>

            <Typography fontWeight={600}>{status.label}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics */}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="کل سفارش‌ها"
            value={stats.total_orders}
            icon={<ShoppingBagOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="سفارش‌های در انتظار"
            value={stats.pending_orders}
            icon={<PendingActionsOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="سفارش‌های تحویل شده"
            value={stats.delivered_orders}
            icon={<CalendarTodayOutlinedIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="مجموع خرید"
            value={`${Number(stats.total_spent).toLocaleString("fa-IR")} تومان`}
            icon={<PaidOutlinedIcon />}
          />
        </Grid>
      </Grid>

      {/* Orders */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          سفارش‌های کاربر
        </Typography>

        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={orders}
            columns={orderColumns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignitems="center"
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>

            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
          </Box>

          {icon}
        </Stack>
      </CardContent>
    </Card>
  );
}

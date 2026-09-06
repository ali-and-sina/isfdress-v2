"use client";

import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  Avatar,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  ArrowBackOutlined,
  PersonOutlined,
  LocalShippingOutlined,
  ReceiptLongOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

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

function formatToman(value) {
  return `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <Stack direction="row" spacing={1.5} alignitems="center" sx={{ mb: 3 }}>
      <Avatar
        sx={{
          bgcolor: "action.hover",
          color: "primary.main",
        }}
      >
        {icon}{" "}
      </Avatar>

      <Box>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default function OrderDetailsClient({ order }) {
  const router = useRouter();

  const [status, setStatus] = useState(order.status);

  const [toast, setToast] = useState(null);

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = subtotal + order.shipping - order.discount;

  function handleStatusChange(event) {
    setStatus(event.target.value);

    setToast({
      severity: "success",
      message: "وضعیت سفارش تغییر کرد",
    });
  }

  return (
    <Box>
      {/* Header */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifycontent="space-between"
        alignitems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Button
            startIcon={<ArrowBackOutlined />}
            onClick={() => router.back()}
            sx={{
              mb: 1,
              gap: 1,
            }}
          >
            بازگشت
          </Button>

          <Typography variant="h4" fontWeight={700}>
            سفارش #{order.id}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            ثبت شده در {order.createdAt}
          </Typography>
        </Box>

        <Chip
          label={statusConfig[status].label}
          color={statusConfig[status].color}
          sx={{
            fontWeight: 600,
          }}
        />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 3,
        }}
      >
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <SectionTitle
              icon={<ShoppingBagOutlined />}
              title="محصولات سفارش"
              subtitle={`${order.items.length} محصول در این سفارش`}
            />

            <Stack spacing={2}>
              {order.items.map((item) => (
                <Box key={item.id}>
                  <Stack direction="row" spacing={2} alignitems="center">
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2,
                        objectFit: "cover",
                        bgcolor: "action.hover",
                      }}
                    />

                    <Box
                      sx={{
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography fontWeight={700}>{item.name}</Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                        }}
                      >
                        رنگ: {item.color}
                        {" • "}
                        سایز: {item.size}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                        }}
                      >
                        تعداد: {item.quantity}
                      </Typography>
                    </Box>

                    <Typography
                      fontWeight={700}
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatToman(item.price * item.quantity)}
                    </Typography>
                  </Stack>

                  <Divider
                    sx={{
                      mt: 2,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <SectionTitle icon={<PersonOutlined />} title="اطلاعات مشتری" />

            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  نام و نام خانوادگی
                </Typography>

                <Typography fontWeight={600}>{order.customer.name}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  شماره تماس
                </Typography>

                <Typography fontWeight={600}>{order.customer.phone}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  ایمیل
                </Typography>

                <Typography fontWeight={600}>{order.customer.email}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <SectionTitle icon={<LocalShippingOutlined />} title="آدرس ارسال" />

            <Stack spacing={2}>
              <Stack direction="row" spacing={5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    استان
                  </Typography>

                  <Typography fontWeight={600}>
                    {order.address.province}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    شهر
                  </Typography>

                  <Typography fontWeight={600}>{order.address.city}</Typography>
                </Box>
              </Stack>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  کد پستی
                </Typography>

                <Typography fontWeight={600}>
                  {order.address.postalCode}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  آدرس کامل
                </Typography>

                <Typography
                  fontWeight={600}
                  sx={{
                    lineHeight: 2,
                  }}
                >
                  {order.address.address}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <SectionTitle icon={<ReceiptLongOutlined />} title="خلاصه سفارش" />

            <Stack spacing={2}>
              <Stack direction="row" justifycontent="space-between">
                <Typography color="text.secondary">مبلغ محصولات</Typography>

                <Typography fontWeight={600}>
                  {formatToman(subtotal)}
                </Typography>
              </Stack>

              <Stack direction="row" justifycontent="space-between">
                <Typography color="text.secondary">هزینه ارسال</Typography>

                <Typography fontWeight={600}>
                  {formatToman(order.shipping)}
                </Typography>
              </Stack>

              <Stack direction="row" justifycontent="space-between">
                <Typography color="text.secondary">تخفیف</Typography>

                <Typography color="error.main" fontWeight={600}>
                  -{formatToman(order.discount)}
                </Typography>
              </Stack>

              <Divider />

              <Stack direction="row" justifycontent="space-between">
                <Typography fontWeight={700}>مبلغ نهایی</Typography>

                <Typography fontWeight={700} color="primary.main">
                  {formatToman(total)}
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                mb: 2,
              }}
            >
              مدیریت سفارش
            </Typography>

            <TextField
              select
              fullWidth
              label="وضعیت سفارش"
              value={status}
              onChange={handleStatusChange}
            >
              {Object.entries(statusConfig).map(([value, config]) => (
                <MenuItem key={value} value={value}>
                  {config.label}
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </Stack>
      </Box>

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

"use client";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const STATUS_CONFIG = {
  pending: { label: "در انتظار پرداخت", color: "warning" },
  paid: { label: "پرداخت شده", color: "info" },
  shipped: { label: "ارسال شده", color: "primary" },
  delivered: { label: "تحویل داده شده", color: "success" },
  cancelled: { label: "لغو شده", color: "error" },
};

function formatToman(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "چند دقیقه پیش";
  if (diffHours < 24) return `${diffHours} ساعت پیش`;
  return `${Math.floor(diffHours / 24)} روز پیش`;
}

export default function RecentActivityCard({ orders }) {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 0.5 }}>
            آخرین سفارشات
          </Typography>
          <Typography variant="body2" color="text.secondary">
            فعالیت‌های اخیر فروشگاه
          </Typography>
        </Box>
        <Button component={Link} href="/admin/dashboard/orders" size="small">
          مشاهده همه
        </Button>
      </Box>

      {orders.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
          هنوز سفارشی ثبت نشده
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {orders.map((order, i) => (
            <Box
              key={order.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 1.5,
                borderBottom: i < orders.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
                gap: 2,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                  {order.customerName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  سفارش #{order.id} · {timeAgo(order.createdAt)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatToman(order.total)}
                </Typography>
                <Chip
                  size="small"
                  label={STATUS_CONFIG[order.status]?.label || order.status}
                  color={STATUS_CONFIG[order.status]?.color || "default"}
                  variant="outlined"
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}

"use client";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const STATUS_CONFIG = {
  pending: { label: "در انتظار پرداخت", color: "#dd8b20" },
  paid: { label: "پرداخت شده", color: "#4a90d9" },
  shipped: { label: "ارسال شده", color: "#4a5568" },
  delivered: { label: "تحویل داده شده", color: "#38a169" },
  cancelled: { label: "لغو شده", color: "#e53e3e" },
};

export default function OrderStatusChart({ statusCounts }) {
  const data = Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([key, count]) => ({
      key,
      name: STATUS_CONFIG[key]?.label || key,
      value: count,
      color: STATUS_CONFIG[key]?.color || "#a0aec0",
    }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, height: "100%" }}>
      <Typography variant="h2" sx={{ mb: 0.5 }}>
        وضعیت سفارشات
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        توزیع کل سفارشات ثبت‌شده
      </Typography>

      {total === 0 ? (
        <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
          هنوز سفارشی ثبت نشده
        </Box>
      ) : (
        <>
          <Box sx={{ width: "100%", height: 200, position: "relative" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} سفارش`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {new Intl.NumberFormat("fa-IR").format(total)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                کل سفارشات
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            {data.map((item) => (
              <Box key={item.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: item.color,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ flex: 1 }} color="text.secondary">
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
}

"use client";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatToman(value) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fa-IR", { day: "numeric", month: "short" });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        px: 1.5,
        py: 1,
        boxShadow: 2,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {formatShortDate(label)}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {formatToman(payload[0].value)} تومان
      </Typography>
    </Box>
  );
}

export default function SalesTrendChart({ data }) {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, height: "100%" }}>
      <Typography variant="h2" sx={{ mb: 0.5 }}>
        روند فروش
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        مجموع فروش هفت روز اخیر
      </Typography>

      <Box sx={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a98a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#d4a98a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e5ea" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatShortDate}
              tick={{ fontSize: 12, fill: "#718096" }}
              axisLine={{ stroke: "#e2e5ea" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#718096" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v >= 1000000 ? `${Math.round(v / 1000000)}M` : v)}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#d4a98a"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

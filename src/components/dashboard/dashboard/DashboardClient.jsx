"use client";

import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Avatar,
  LinearProgress,
} from "@mui/material";

import {
  TrendingUp,
  ShoppingBag,
  People,
  Payments,
  ArrowUpward,
  MoreHoriz,
} from "@mui/icons-material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { formatPrice } from "@/lib/products";
import StatCard from "./StatCard";

const salesData = [
  { month: "فروردین", sales: 1200000, orders: 32 },
  { month: "اردیبهشت", sales: 1800000, orders: 45 },
  { month: "خرداد", sales: 1400000, orders: 38 },
  { month: "تیر", sales: 2300000, orders: 58 },
  { month: "مرداد", sales: 2800000, orders: 72 },
  { month: "شهریور", sales: 3400000, orders: 86 },
];

const orderStatusData = [
  { name: "در حال پردازش", value: 12 },
  { name: "ارسال شده", value: 18 },
  { name: "تحویل شده", value: 46 },
  { name: "لغو شده", value: 6 },
];

const topProducts = [
  {
    id: 1,
    name: "شلوار جین مردانه",
    sales: 124,
    progress: 88,
  },
  {
    id: 2,
    name: "شال و روسری زنانه",
    sales: 98,
    progress: 72,
  },
  {
    id: 3,
    name: "پیراهن تابستانی",
    sales: 76,
    progress: 58,
  },
  {
    id: 4,
    name: "کفش اسپرت",
    sales: 54,
    progress: 42,
  },
];

export default function DashboardClient() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          داشبورد
        </Typography>

        <Typography color="text.secondary">
          وضعیت فروشگاه خود را از اینجا بررسی کنید.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <StatCard
          title="فروش امروز"
          value={`${formatPrice(3400000)} تومان`}
          subtitle="۱۲٪ نسبت به دیروز"
          icon={<TrendingUp />}
        />

        <StatCard
          title="تعداد سفارش‌ها"
          value="۸۶"
          subtitle="۸٪ افزایش"
          icon={<ShoppingBag />}
        />

        <StatCard
          title="مشتریان جدید"
          value="۲۴"
          subtitle="۵ نفر بیشتر"
          icon={<People />}
        />

        <StatCard
          title="میانگین سفارش"
          value={`${formatPrice(780000)} تومان`}
          subtitle="۴٪ افزایش"
          icon={<Payments />}
        />
      </Box>

      {/* Charts */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Sales Chart */}

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
            direction="row"
            justifycontent="space-between"
            alignitems="center"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                روند فروش
              </Typography>

              <Typography variant="body2" color="text.secondary">
                میزان فروش در شش ماه گذشته
              </Typography>
            </Box>

            <Chip label="۶ ماه اخیر" size="small" variant="outlined" />
          </Stack>

          <Box sx={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#23ab34" stopOpacity={0.35} />

                    <stop offset="100%" stopColor="#23ab34" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis dataKey="month" tickLine={false} axisLine={false} />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />

                <Tooltip formatter={(value) => `${formatPrice(value)} تومان`} />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#23ab34"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Order Status */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            وضعیت سفارش‌ها
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            وضعیت سفارش‌های اخیر
          </Typography>

          <Box
            sx={{
              height: 260,
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={["#23ab34", "#2196f3", "#ff9800", "#f44336"][index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Stack spacing={1.2}>
            {orderStatusData.map((item) => (
              <Stack
                key={item.name}
                direction="row"
                justifycontent="space-between"
              >
                <Typography variant="body2" color="text.secondary">
                  {item.name}
                </Typography>

                <Typography variant="body2" fontWeight={700}>
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>

      {/* Bottom Section */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        {/* Orders Chart */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
            تعداد سفارش‌ها
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            تعداد سفارش‌های ثبت شده
          </Typography>

          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis dataKey="month" tickLine={false} axisLine={false} />

                <YAxis tickLine={false} axisLine={false} />

                <Tooltip />

                <Bar dataKey="orders" radius={[8, 8, 0, 0]} fill="#23ab34" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* Top Products */}

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
            direction="row"
            justifycontent="space-between"
            alignitems="center"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                محصولات پرفروش
              </Typography>

              <Typography variant="body2" color="text.secondary">
                بر اساس تعداد فروش
              </Typography>
            </Box>

            <MoreHoriz color="action" />
          </Stack>

          <Stack spacing={3}>
            {topProducts.map((product, index) => (
              <Box key={product.id}>
                <Stack
                  direction="row"
                  justifycontent="space-between"
                  alignitems="center"
                  sx={{ mb: 1 }}
                >
                  <Stack direction="row" spacing={1.5} alignitems="center">
                    <Avatar>{index + 1}</Avatar>

                    <Typography variant="body2" fontWeight={600}>
                      {product.name}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" fontWeight={700}>
                    {product.sales} فروش
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={product.progress}
                  sx={{
                    height: 7,
                    borderRadius: 10,
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

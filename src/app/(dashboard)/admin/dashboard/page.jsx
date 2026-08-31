import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Inventory2Icon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { db } from "@/lib/db";
import { dashboardProducts } from "@/lib/dashboardProducts";

//  function getStats() {
//     const [productCount, orderCount, userCount, pendingOrders] = await Promise.all([
//       getProducts().variants.,
//       db.order.count(),
//       db.user.count(),
//       db.order.count({ where: { status: "pending" } }),
//     ]);
//     return { productCount, orderCount, userCount, pendingOrders };

// }

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: `${color}.main`,
          opacity: 0.15,
          position: "absolute",
        }}
      />
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: `${color}.light`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: `${color}.dark`,
        }}
      >
        <Icon />
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {new Intl.NumberFormat("fa-IR").format(value)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

export default async function DashboardIndexPage() {
  // const stats = await getStats();

  const productCount = (await dashboardProducts()).totalItems;
  console.log(productCount);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        نمای کلی
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Inventory2Icon}
            label="تعداد محصولات"
            value={productCount}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ReceiptLongIcon}
            label="کل سفارشات"
            value="0"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ReceiptLongIcon}
            label="سفارشات در انتظار"
            value="0"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PeopleIcon}
            label="تعداد کاربران"
            value="0"
            color="success"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

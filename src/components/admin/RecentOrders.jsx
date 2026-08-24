import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const orders = [
  {
    id: "#1024",
    customer: "علی احمدی",
    amount: "۶۳۰,۰۰۰ تومان",
    status: "تکمیل شده",
  },
  {
    id: "#1025",
    customer: "محمد رضایی",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "در انتظار",
  },
  {
    id: "#1026",
    customer: "رضا کریمی",
    amount: "۴۲۰,۰۰۰ تومان",
    status: "لغو شده",
  },
];

export default function RecentOrders() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ p: 3 }}>
        آخرین سفارش‌ها
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>شماره سفارش</TableCell>
              <TableCell>مشتری</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>وضعیت</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    color={
                      order.status === "تکمیل شده"
                        ? "success"
                        : order.status === "لغو شده"
                          ? "error"
                          : "warning"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

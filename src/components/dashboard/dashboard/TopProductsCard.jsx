"use client";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

function formatToman(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

export default function TopProductsCard({ products }) {
  const maxQuantity = Math.max(...products.map((p) => p.quantity), 1);

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, height: "100%" }}>
      <Typography variant="h2" sx={{ mb: 0.5 }}>
        پرفروش‌ترین محصولات
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        بر اساس تعداد فروخته‌شده
      </Typography>

      {products.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
          هنوز فروشی ثبت نشده
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {products.map((product, index) => (
            <Box key={product.id}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: 1,
                      bgcolor: index === 0 ? "secondary.main" : "background.default",
                      color: index === 0 ? "#fff" : "text.secondary",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                    {product.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0, pl: 1 }}>
                  {product.quantity} فروش
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(product.quantity / maxQuantity) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: "background.default",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 3,
                    bgcolor: "secondary.main",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
